'use strict';

const expect = require('chai').expect;

const handler = require('./endpoint/handler');

describe('handler module', () => {
  const rest = {
    pageNumber: 1,
    pageSize: 10,
  };

  const ascOrderExpected = [
    'Hong Kong',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Israel',
    'Japan',
    'Jordan',
    'Kazakhstan',
    "Korea (Democratic People's Republic of)",
  ];

  const descOrderExpected = [
    'Yemen',
    'Viet Nam',
    'Uzbekistan',
    'United Arab Emirates',
    'Turkmenistan',
    'Turkey',
    'Timor-Leste',
    'Thailand',
    'Tajikistan',
    'Taiwan',
  ];

  describe('handler module: Search', () => {
    it('function exists', (done) => {
      expect(handler.search).to.exist;
      done();
    });

    it('should returns an array', async (done) => {
      const results = await handler.search({
        ...rest,
      });

      expect(Array.isArray(results)).to.be.true;
      done();
    });

    it('should returns records with population between 1000 and 2000 people', async (done) => {
      const results = await handler.search({
        ...rest,
        from: 1000,
        to: 1500,
      });

      const firstWrongRange = results.some(
        (record) => record.population < 1000
      );
      const secondWrongRange = results.some(
        (record) => record.population > 1500
      );
      expect(firstWrongRange).to.be.false;
      expect(secondWrongRange).to.be.false;
      done();
    });

    it('should returns records from Asia region only', async (done) => {
      const results = await handler.search({
        ...rest,
        region: 'Asia',
      });

      const wrongRange = results.some((record) => record.region !== 'Asia');
      expect(wrongRange).to.be.false;
      expect(results.length).to.be.equal(rest.pageSize);
      done();
    });

    it(`should returns ${ascOrderExpected.join()} in the same order when sort by name is specified as asc`, async (done) => {
      const region = 'Asia';
      const results = await handler.search({
        pageNumber: 2,
        pageSize: 10,
        region,
        sort: {
          name: 'asc',
        },
      });

      expect(results.length === ascOrderExpected.length).to.be.true;

      //must follow the same order
      expect(results[0].name).to.be.equal(ascOrderExpected[0]);
      expect(results[1].name).to.be.equal(ascOrderExpected[1]);
      expect(results[2].name).to.be.equal(ascOrderExpected[2]);
      expect(results[3].name).to.be.equal(ascOrderExpected[3]);
      expect(results[4].name).to.be.equal(ascOrderExpected[4]);
      expect(results[5].name).to.be.equal(ascOrderExpected[5]);
      expect(results[6].name).to.be.equal(ascOrderExpected[6]);
      expect(results[7].name).to.be.equal(ascOrderExpected[7]);
      expect(results[8].name).to.be.equal(ascOrderExpected[8]);
      expect(results[9].name).to.be.equal(ascOrderExpected[9]);

      //must be all in the right region
      expect(results[0].region).to.be.equal(region);
      expect(results[1].region).to.be.equal(region);
      expect(results[2].region).to.be.equal(region);
      expect(results[3].region).to.be.equal(region);
      expect(results[4].region).to.be.equal(region);
      expect(results[5].region).to.be.equal(region);
      expect(results[6].region).to.be.equal(region);
      expect(results[7].region).to.be.equal(region);
      expect(results[8].region).to.be.equal(region);
      expect(results[9].region).to.be.equal(region);

      done();
    });

    it(`should returns ${descOrderExpected.join()} in the same order when sort by name is specified as desc`, async (done) => {
      const region = 'Asia';
      const results = await handler.search({
        ...rest,
        region,
        sort: {
          name: 'desc',
        },
      });

      expect(results.length === descOrderExpected.length).to.be.true;

      //must follow the same order
      expect(results[0].name).to.be.equal(descOrderExpected[0]);
      expect(results[1].name).to.be.equal(descOrderExpected[1]);
      expect(results[2].name).to.be.equal(descOrderExpected[2]);
      expect(results[3].name).to.be.equal(descOrderExpected[3]);
      expect(results[4].name).to.be.equal(descOrderExpected[4]);
      expect(results[5].name).to.be.equal(descOrderExpected[5]);
      expect(results[6].name).to.be.equal(descOrderExpected[6]);
      expect(results[7].name).to.be.equal(descOrderExpected[7]);
      expect(results[8].name).to.be.equal(descOrderExpected[8]);
      expect(results[9].name).to.be.equal(descOrderExpected[9]);

      //must be all in the right region
      expect(results[0].region).to.be.equal(region);
      expect(results[1].region).to.be.equal(region);
      expect(results[2].region).to.be.equal(region);
      expect(results[3].region).to.be.equal(region);
      expect(results[4].region).to.be.equal(region);
      expect(results[5].region).to.be.equal(region);
      expect(results[6].region).to.be.equal(region);
      expect(results[7].region).to.be.equal(region);
      expect(results[8].region).to.be.equal(region);
      expect(results[9].region).to.be.equal(region);

      done();
    });
  });
});
