'use strict';

const HttpError = require('lib/wiring/errors/http-error');
const controller = require('lib/wiring/controller');
const models = require('app/models');
const Example = models.example;

const authenticate = require('./concerns/authenticate');

const setExample = (req, res, next) => {
  Example.findById(req.params.id, (error, example) => {
    error = error || !example && new HttpError(404);
    if (error) {
      return next(error);
    }

    req.example = example;
    next();
  });
};

const setExampleForCurrentUser = (req, res, next) => {
  let modelId = req.params.id || null;
  let ownerId = req.currentUser._id || null;
  Example.findOne({ _id: modelId, _owner: ownerId }, (error, example) => {
    error = error || !example && new HttpError(404);
    if (error) {
      return next(error);
    }

    req.example = example;
    next();
  });
};

const index = (req, res, next) => {
  Example.find()
    .then(examples => res.json({ examples }))
    .catch(err => next(err));
};

const show = (req, res) => {
  res.json({ example: req.example });
};

const create = (req, res, next) => {
  let example = Object.assign(req.body.example, {
    _owner: req.currentUser._id,
  });
  Example.create(example)
    .then(example => res.status(201).json({ example }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.example.update(req.body.example)
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  req.example.remove()
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
  { method: setExample, only: ['show'] },
  { method: setExampleForCurrentUser, only: ['update', 'destroy'] },
], });
