'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Upload = models.upload;
const multer = require('multer');
const multerUploader = multer({ dest: '/tmp/' });
const s3Upload = require('lib/s3-upload');

// const authenticate = require('./concerns/authenticate');

// const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    upload: req.upload.toJSON({ virtuals: true, user: req.user }),
  });
};

const create = (req, res, next) => {
  // let upload = Object.assign(req.body.upload, {
  //   _owner: req.user._id,
  // });
  // Upload.create(upload)
  //   .then(upload =>
  //     res.status(201)
  //       .json({
  //         upload: upload.toJSON({ virtuals: true, user: req.user }),
  //       }))
  //   .catch(next);
  console.log('req is file ', req.file);
  console.log('req.body is ', req.body);
  let file = {
    title: req.file.originalname,
    path: req.file.path,
  };

  s3Upload(file)
  .then((s3Response) => {
    //get the url//
    let url = s3Response.Location;
    return Upload.create({
      title: file.title,
      url: url,
    });
  })
  .then((upload) => res.json({ upload }))
  .catch((error) => next(error));
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.upload.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: multerUploader.single('image[file]'), only: ['create'] },

  // { method: setUser, only: ['index', 'show'] },
  // { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] },
], });
