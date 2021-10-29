const router = require("express").Router();
const Test = require("../models/data");
router.get("/country", async (req, res) => {
  await Test.distinct("country").exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.length > 0)];
      return res.status(200).send(data);
    }
  });
});

router.get("/topic", async (req, res) => {
  await Test.distinct("topic").exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.length > 0)];
      return res.status(200).send(data);
    }
  });
});

router.get("/sector", async (req, res) => {
  await Test.distinct("sector").exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.length > 0)];
      return res.status(200).send(data);
    }
  });
});

router.get("/region", async (req, res) => {
  await Test.distinct("region").exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.length > 0)];
      return res.status(200).send(data);
    }
  });
});

router.get("/source", async (req, res) => {
  await Test.distinct("source").exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.length > 0)];
      return res.status(200).send(data);
    }
  });
});

router.get("/pestle", async (req, res) => {
  await Test.distinct("pestle").exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.length > 0)];
      return res.status(200).send(data);
    }
  });
});

router.get("/endDateRange", async (req, res) => {
  await Test.find({}, { end_year: 1 }).exec((error, data) => {
    if (error) return res.status(500).send(error);
    if (data) {
      data = [...data.filter((d) => d.end_year != null)];
      data.sort((a, b) => a.end_year - b.end_year);
      let end_year_range = {
        max: data[data.length - 1].end_year,
        min: data[0].end_year,
      };
      return res.status(200).send(end_year_range);
    }
  });
});

router.post("/graphData", async (req, res) => {
  const options = req.body.filter;
  const keys = Object.keys(options);
  const { key, value } = req.body.coordinates;
    let query;

    query = { $and: [] };
    keys.map((k) => {
      const temp = {};
      if (options[k] != "" && k !== "end_year") {
        temp[k] = options[k];
        query.$and.push(temp);
      }
      if (k === "end_year" && options[k] != null) {
          temp[k] = { $lte: options[k] };
        query.$and.push(temp);
      }
    });
    if (query.$and.length === 0)
        query = {};

  try {
    const result = await Test.find(query);
    let vA = [...new Set(result.map((each) => each[key]))];
    vA = [...vA.filter((c) => c.length !== 0)];
    let graphData = [];

    vA.map((v) => {
      let count = 0;
      let total = 0;

      result.map((each) => {
        if (each[key] === v) {
          total += each[value];
          count += 1;
        }
      });

      const average = Math.floor(total / count);
      let temp = {};
      temp[key] = v;
      temp[value] = average;
      graphData.push(temp);
    });

    return res.status(200).send(graphData);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
