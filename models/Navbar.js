import mongoose from 'mongoose';

const navbarSchema = new mongoose.Schema(
  {
    links: {
      name: {
        en: { type: String },
        ar: { type: String }
      },
      url: { type: String, required: true }
    }
  },
  { timestamps: true }
);

// ✅ Add validation using a pre-save hook
navbarSchema.pre('save', function (next) {
  if (!this.links.name.en && !this.links.name.ar) {
    return next(new Error('At least one of "en" or "ar" is required.'));
  }
  next();
});

const Navbar = mongoose.model('Navbar', navbarSchema);
export default Navbar;
