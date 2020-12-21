import transports from '../transports';
import { withErrorHandling } from '../utils';

const { stream } = transports;

export const push = withErrorHandling(async (req, res) => {
  const result = await stream.transport(req.body);

  res.json({ result });
});
