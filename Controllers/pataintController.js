import { write, utils } from 'xlsx';
import Pataint from '../Models/pataintModel.js';
import bcrypt from 'bcryptjs';
import express from 'express';
import { Sequelize } from 'sequelize';

//to rigster a user
export const rigsterPataint = async(req, res) => {
    const {No, Name, MRN, Age, Sex, ClinicalPresentation, Diagnosis, ImagingFinding, Surgeon, Asistant, Ansthesia, Nurse, DurationOfSurgery, DurationOfAnsthesia, OutcomeOfPatient, Remark} = req.body;
    const email = req.user.email; 
    try{
            const isExist = await Pataint.findOne({where: {No: No}});
            if(isExist){
                res.status(401).send({error: 'Pataint already exist'});
            }

            const user = await Pataint.create({
                No: No,
                Name: Name,
                MRN: MRN,
                Age: Age,
                Sex: Sex,
                ClinicalPresentation: ClinicalPresentation,
                Diagnosis: Diagnosis,
                ImagingFinding: ImagingFinding,
                Surgeon: Surgeon,
                Asistant: Asistant,
                Ansthesia: Ansthesia,
                Nurse: Nurse,
                DurationOfSurgery: DurationOfSurgery,
                DurationOfAnsthesia: DurationOfAnsthesia,
                OutcomeOfPatient: OutcomeOfPatient,
                Remark: Remark,
                email

            });
            res.status(200).send({message: 'pataint rigstered successfully'});
    }
    catch(error){
        console.error('unable to rigster the pataint', error);
        res.status(500).send({error: 'can not rigster'})
    }
    
}



// Get all patients registered by logged-in user
export const getAllPataintsByUser = async (req, res) => {
    const email = req.user.email;  

    try {
        const patients = await Pataint.findAll({ where: { email } });  
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'there is no rigstered pataint here' });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error('Unable to fetch patients', error);
        res.status(500).json({ error: 'Server error' });
    }
};



// New function to download Excel file
export const downloadFile = async (req, res) => {
    try {
        const patients = await Pataint.findAll();

        // Map patients to a format suitable for Excel
        const data = patients.map(patient => ({
            No: patient.No,
            Name: patient.Name,
            MRN: patient.MRN,
            Age: patient.Age,
            Sex: patient.Sex,
            ClinicalPresentation: patient.ClinicalPresentation,
            Diagnosis: patient.Diagnosis,
            ImagingFinding: patient.ImagingFinding,
            Surgeon: patient.Surgeon,
            Asistant: patient.Asistant,
            Ansthesia: patient.Ansthesia,
            Nurse: patient.Nurse,
            DurationOfSurgery: patient.DurationOfSurgery,
            DurationOfAnsthesia: patient.DurationOfAnsthesia,
            OutcomeOfPatient: patient.OutcomeOfPatient,
            Remark: patient.Remark
        }));

        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Patients");

        const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="Patients.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(excelBuffer);

    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).send({ error: 'Unable to generate Excel file' });
    }
};