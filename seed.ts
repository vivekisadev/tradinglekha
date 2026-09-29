import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@tradinglekha.com';
  
  // Find or create the user
  let user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        fullName: 'Admin User',
        passwordHash: 'dummy_hash',
      }
    });
  }

  // Find or create an account for them
  let account = await prisma.account.findFirst({ where: { userId: user.id } });
  if (!account) {
    account = await prisma.account.create({
      data: {
        userId: user.id,
        name: 'Main Equity',
        accountType: 'Equity',
        currency: 'USD'
      }
    });
  }

  // Let's add some dummy trades over the last 14 days
  console.log('Seeding trades...');
  const symbols = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'AMZN'];
  
  for (let i = 0; i < 20; i++) {
    // Random day in the last 14 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14));
    
    // Random PnL between -500 and +1000
    const pnl = Math.floor(Math.random() * 1500) - 500;
    
    await prisma.trade.create({
      data: {
        userId: user.id,
        accountId: account.id,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        side: Math.random() > 0.5 ? 'LONG' : 'SHORT',
        status: 'CLOSED',
        assetClass: 'Equity',
        currency: 'USD',
        realizedPnl: pnl,
        openedAt: date,
        closedAt: new Date(date.getTime() + Math.random() * 3600000), // exit 1 hr later
      }
    });
  }

  console.log('Done seeding trades.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
