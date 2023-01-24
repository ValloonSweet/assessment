const { deterministicPartitionKey } = require('./original');
const { deterministicPartitionKeyRefactor } = require('./assessment')

test('should be equal with partitionKey', () => {
    expect(deterministicPartitionKey({partitionKey: 'abcd'})).toBe(deterministicPartitionKeyRefactor({partitionKey: 'abcd'}));
})

test('should be equal without partitionKey', () => {
    expect(deterministicPartitionKey({noPartitionKey: 'abcd'})).toBe(deterministicPartitionKeyRefactor({noPartitionKey: 'abcd'}))
})