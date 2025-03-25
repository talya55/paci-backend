import mongoose from 'mongoose';

const dailyNewsSchema = new mongoose.Schema({
  links: {
    name: {
      en: { type: String },
      ar: { type: String }
    },
    url: { type: String, required: true }
  },
  description: { type: String, required: true },
},
{ timestamps: true }
);

dailyNewsSchema.pre('save', function (next) {
if (!this.links.name.en && !this.links.name.ar) {
  return next(new Error('At least one of "en" or "ar" is required.'));
}
next();
});


const DailyNews = mongoose.model('DailyNews', dailyNewsSchema);
export default DailyNews;
