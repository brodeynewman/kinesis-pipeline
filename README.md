# Data streaming with AWS Kinesis

Many applications require the need for realtime data processing.

There are many tools to solve this problem, including Kafka, AWS SQS, RabbitMQ, etc...

In this example, we will be using Kinesis as our data streaming service.

## Why Kinesis?

### Kinesis vs SQS
- Kinesis offers multiple consumers for a single stream. SQS only allows one consumer at a time.
- Kinesis is built for scalable real-time data processing. While SQS *can* solve this problem -- depending on how much throughput your application gets -- the SQS consumer limitations might be a bottleneck.

### Kinesis vs MSK (Kafka)
- Kinesis is a fully managed service that allows 'connections' to other AWS services like Lambda, EC2, Kinesis Analytics, EMR, Firehose etc. This *can* be a major convenience when building distributed, multi-region / multi-AZ stream architecture.
- Kinesis replicates data across 3 availability zones by default. This means if one AZ goes down, data is made available to 2 other AZ's.
- Kinesis has "at-least-once" delivery for messages. This means, in the event a system fails or a network issue occurs, a message producer may continue to retry a message until it receives a successful acknowledgement (depending on your app, this may not be a pro, since consumers must handle potential duplicate messages.).
- Kinesis has auto-scaling capabilities while MSK requires cluster sizing experience. Identifying the right cluster size is an iterative process and requires cluster management expertise.

## Continued Research
1. Pricing. You can use the Kinesis pricing calculator [here](https://aws.amazon.com/kinesis/data-streams/pricing/).
2. Multi-region replication. I don't know too much about it, but can be done with added infrastructure like Lambda. [Read more](https://engineering.opsgenie.com/cross-region-replication-of-kinesis-streams-4a62f3bb269d).
3. To avoid read throughput bottlenecks, consider [fan out architecture](https://www.linkedin.com/pulse/how-fan-out-amazon-kinesis-streams-alex-casalboni/).

## [Kinesis Service Limits](https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html)