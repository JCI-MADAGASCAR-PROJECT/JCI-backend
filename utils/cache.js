import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 0,
  checkperiod: 600,
  useClones: true,
});

export default cache;