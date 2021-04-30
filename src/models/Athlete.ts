import mongoose from 'mongoose'

const AthleteSchema = new mongoose.Schema({
	idUser: {
		type: Number,
	},
	name: {
		type: String,
	},
	bike_total: {
		type: Number,
	},
	bike_biggest: {
		type: Number,
	},
	run_total: {
		type: Number,
	},
	run_biggest: {
		type: Number,
	},
	swim_total: {
		type: Number,
	},
	swim_biggest: {
		type: Number,
	},
	updated_at: {
		type: Number,
	}
})

export default mongoose.models.Athlete || mongoose.model('Athlete', AthleteSchema);