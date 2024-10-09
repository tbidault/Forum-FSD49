import { selectSections, selectSectionById, pushSection } from '../models/sectionModel.js';

export const getSections = async (req, res, next) => {
    try {
        const result = await selectSections();
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getSectionById = async (req, res, next) => {
    try {
        const result = await selectSectionById(req.params.id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const addSection = async (req, res, next) => {
    try {
        const Section = {
            ...req.body,
        };
        const result = await pushSection(Section);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};