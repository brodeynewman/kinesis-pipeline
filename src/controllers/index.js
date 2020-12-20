import transports from '../transports';

const { stream } = transports;

export const push = async (req, res) => {
  await stream.transport(req.body);

  res.json({ success: true });
};
