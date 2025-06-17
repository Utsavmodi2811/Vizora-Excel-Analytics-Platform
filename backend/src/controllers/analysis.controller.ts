import { Request, Response } from 'express';
import { Analysis } from '../models/analysis.model';

// Get user's analysis history
export const getAnalysisHistory = async (req: Request, res: Response) => {
  try {
    const analyses = await Analysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ analyses });
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    res.status(500).json({ message: 'Error fetching analysis history' });
  }
};

// Create new analysis record
export const createAnalysis = async (req: Request, res: Response) => {
  try {
    const { fileName, fileType, fileSize, analysisType } = req.body;

    const analysis = new Analysis({
      userId: req.user._id,
      fileName,
      fileType,
      fileSize,
      analysisType,
      status: 'pending'
    });

    await analysis.save();

    res.status(201).json({ analysis });
  } catch (error) {
    console.error('Error creating analysis:', error);
    res.status(500).json({ message: 'Error creating analysis' });
  }
};

// Update analysis result
export const updateAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, result, error } = req.body;

    const analysis = await Analysis.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { status, result, error },
      { new: true }
    );

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json({ analysis });
  } catch (error) {
    console.error('Error updating analysis:', error);
    res.status(500).json({ message: 'Error updating analysis' });
  }
};

// Delete analysis
export const deleteAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const analysis = await Analysis.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    console.error('Error deleting analysis:', error);
    res.status(500).json({ message: 'Error deleting analysis' });
  }
}; 