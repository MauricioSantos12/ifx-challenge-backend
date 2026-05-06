const crypto = require('crypto');

exports.seed = async function (knex) {
  await knex('vms').del();

  await knex('vms').insert([
    {
      id: crypto.randomUUID(),
      name: 'VM-01',
      cores: 4,
      ram: 16,
      disk: 100,
      os: 'Linux',
      status: 'Encendida',
      isDeleted: false,
    },
    {
      id: crypto.randomUUID(),
      name: 'VM-02',
      cores: 2,
      ram: 8,
      disk: 50,
      os: 'Windows',
      status: 'Apagada',
      isDeleted: false,
    },
  ]);
};
