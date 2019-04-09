const mongoose = require("mongoose");
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var employeeSchema = new Schema({
    name:{ type: String, default: null },
    photo:{ type: String, default: null },
    title:{ type: String, default: null },
	sex:{ type: String, default: null },
	startDate:{ type: String, default: Date.now.toString() },
	officePhone:{ type: String, default: null },
	cellPhone: { type: String, default: null },
	sms: { type: String, default: null },
	email: { type: String, default: null },
	managerId:{type: ObjectId, default: null},
	managerName:{type: String, default: null},
    // numberDR:{ type: Number, default: 0 },
    reportList:{ type: [ObjectId], default: []},
});
var employee = mongoose.model("employee",employeeSchema,"employee");


module.exports.employee=employee;


