const constants = {
  DDB_WRITE_QUEUE: 'event-ingestion-ddb-write.fifo',
  STREAM_PREFIX: 'event-ingestion',
  EVENT_TABLE_NAME: 'event-ingestion-events',
  AVAILABLE_STREAMS: {
    default: {
      enabled: true,
    },
  },
};

export default Object.freeze(constants);
