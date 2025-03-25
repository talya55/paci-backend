import mongoose from 'mongoose';

const paciWebSchema = new mongoose.Schema(  {
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

paciWebSchema.pre('save', function (next) {
if (!this.links.name.en && !this.links.name.ar) {
  return next(new Error('At least one of "en" or "ar" is required.'));
}
next();
});

const PaciWeb = mongoose.model('PaciWeb', paciWebSchema);
export default PaciWeb;
