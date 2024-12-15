import { selectSections, selectSectionById, pushSection, deleteSection, updateSection } from '../models/sectionModel.js';

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

export const deleteSectionById = async (req, res, next) => {
    try {
        const result = await deleteSection(req.params.id);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};

export const updateSectionById = async (req, res, next) => {
    try {
        const result = await updateSection(req.params.id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};