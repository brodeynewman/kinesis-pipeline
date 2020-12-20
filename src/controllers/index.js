import transports from '../transports';

const { stream } = transports;

export const push = async (req, res) => {
  const result = await stream.transport(req.body);

  res.json({ result });
};
