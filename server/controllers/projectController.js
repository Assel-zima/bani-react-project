import Project from '../models/Project.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const projectPopulate = 'services'

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate(projectPopulate).sort({ createdAt: -1 })
  res.json(projects)
})

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(projectPopulate)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json(project)
})

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body)
  const populatedProject = await project.populate(projectPopulate)
  res.status(201).json(populatedProject)
})

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate(projectPopulate)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json(project)
})

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json({ message: 'Project deleted' })
})
