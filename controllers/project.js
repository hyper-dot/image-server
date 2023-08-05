import Project from '../models/Project.js';
export const showAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'cannot fetch projects :: error from server' });
  }
};

export const createProject = async (req, res) => {
  const { title, githubUrl, liveUrl, desc } = req.body;
  const imageUrl = req.file.path;
  try {
    const project = new Project({
      title,
      desc,
      githubUrl,
      liveUrl,
      imageUrl,
    });
    await project.save();
    return res.status(201).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'failed' });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    return res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'cannot delete project' });
  }
};

export const getOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'cannot find the project' });
  }
};

export const editProject = async (req, res) => {
  const { id } = req.params;
  const { title, desc, liveUrl, githubUrl } = req.body;
  try {
    await Project.findByIdAndUpdate(id, { title, desc, liveUrl, githubUrl });
    return res.status(202).json({ message: 'post updated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'cannot update project' });
  }
};
