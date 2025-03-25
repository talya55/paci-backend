import mongoose from 'mongoose';

const circularSchema = new mongoose.Schema(
  {
    links: {
      name: {
        en: String,
        ar: String,
      },
      pdf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploads.files',
      },
      pdfUrl: { type: String }, // ✅ Add pdfUrl to schema
    },
    description: String,
  },
  { timestamps: true }
);

const Circular = mongoose.model('Circular', circularSchema);

export default Circular;
