import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumAll = (transactions: Transaction[]): number =>
      transactions.reduce(
        (accumulator, transaction) => accumulator + transaction.value,
        0,
      );

    const income = sumAll(
      this.transactions.filter(transaction => transaction.type === 'income'),
    );
    const outcome = sumAll(
      this.transactions.filter(transaction => transaction.type === 'outcome'),
    );
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
