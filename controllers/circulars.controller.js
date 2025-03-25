import Circular from '../models/Circulars.js'
import mongoose from 'mongoose';


export const createCircular = async (req, res) => {
  try {
    const { en, ar, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Uploading file to GridFS...');

    const writeStream = global.gfs.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    writeStream.end(req.file.buffer);

    writeStream.on('finish', async () => {
      const fileId = writeStream.id;

      // ✅ Generate PDF URL
      const pdfUrl = `${req.protocol}://${req.get('host')}/api/circulars/file/${fileId}`;

      // ✅ Save file ID and other data to MongoDB collection
      const newCircular = new Circular({
        links: {
          name: {
            en,
            ar,
          },
          pdf: fileId,
          pdfUrl, // ✅ Ensure pdfUrl is included
        },
        description,
      });

      await newCircular.save();

      res.status(201).json({
        message: 'Circular created successfully',
        newCircular,
      });
    });

    writeStream.on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'File upload failed' });
    });
  } catch (error) {
    console.error('Error creating circular:', error);
    res.status(500).json({ error: error.message });
  }
};



export const getAllCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find()
    res.status(200).json(circulars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ✅ Get circular by ID
export const getCircularById = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular) {
      return res.status(404).json({ error: 'Circular not found' });
    }
    res.status(200).json(circular);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCircular = async (req, res) => {
  try {
    const { en, ar, description } = req.body;

    // Step 1: Find existing circular
    const existingCircular = await Circular.findById(req.params.id);
    if (!existingCircular) {
      return res.status(404).json({ error: 'Circular not found' });
    }

    let fileId = existingCircular.links?.pdf; // Keep existing file if no new file is uploaded
    let pdfUrl = existingCircular.links?.pdfUrl; // Keep existing pdfUrl if no new file is uploaded

    if (req.file) {
      // ✅ Delete previous file from GridFS if it exists
      if (existingCircular.links?.pdf) {
        try {
          await global.gfs.delete(new mongoose.Types.ObjectId(existingCircular.links.pdf));
          console.log(`Previous file with ID ${existingCircular.links.pdf} deleted from GridFS`);
        } catch (error) {
          console.error(`Failed to delete previous file: ${error.message}`);
        }
      }

      // ✅ Upload new file to GridFS
      const writeStream = global.gfs.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      writeStream.end(req.file.buffer);

      // ✅ Wait for the file to finish uploading
      await new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
          fileId = writeStream.id; // ✅ New file ID
          pdfUrl = `${req.protocol}://${req.get('host')}/api/circulars/file/${fileId}`; // ✅ Generate new PDF URL
          console.log(`New file uploaded with ID ${fileId}`);
          resolve(true);
        });

        writeStream.on('error', (error) => {
          console.error(`File upload error: ${error.message}`);
          reject(error);
        });
      });
    }

    // Step 3: Update the circular with new values and fileId (if available)
    const updatedCircular = await Circular.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          links: {
            name: {
              en: en || existingCircular.links?.name?.en,
              ar: ar || existingCircular.links?.name?.ar,
            },
            pdf: fileId,
            pdfUrl, // ✅ Store new or existing pdfUrl
          },
          description: description || existingCircular.description,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedCircular);
  } catch (error) {
    console.error('Error updating circular:', error);
    res.status(500).json({ error: error.message });
  }
};




export const deleteCircular = async (req, res) => {
  try {
    // Step 1: Find the circular by ID
    const circular = await Circular.findById(req.params.id);
    if (!circular) {
      return res.status(404).json({ error: 'Circular not found' });
    }

    // Step 2: Delete associated file if exists
    if (circular.links?.pdf) {
      const fileId = circular.links.pdf;
      try {
        await global.gfs.delete(new mongoose.Types.ObjectId(fileId));
        console.log(`File with ID ${fileId} deleted from GridFS`);
      } catch (error) {
        console.error(`Failed to delete file with ID ${fileId}: ${error.message}`);
      }
    }

    // Step 3: Delete the circular itself
    await Circular.findByIdAndDelete(req.params.id);

    res.status(200).json("Circular data successfully deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ File Retrieval from GridFS
export const getFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const objectId = new mongoose.Types.ObjectId(fileId);

    const readStream = global.gfs.openDownloadStream(objectId);

    readStream.on('error', (err) => {
      console.error('Error reading file:', err);
      return res.status(404).json({ error: 'File not found' });
    });

    res.set('Content-Type', 'application/pdf');
    readStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ error: error.message });
  }
};

