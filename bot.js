const { Telegraf, Markup } = require('telegraf');
const LocalSession = require('telegraf-session-local');

const bot = new Telegraf('8589603393:AAE2eF3lD21B82S0XEZn0vstVTSvkv8u06M');

bot.use((new LocalSession({ database: 'sessions.json' })).middleware());

const ADMIN_ID = 6597261815;

bot.start(async (ctx) => {
  if (ctx.startPayload) {
    await ctx.reply(`خوش اومدی! کد دعوت: ${ctx.startPayload}\nمنتظر شروع بازی باش 🚀`);
    return;
  }

  await ctx.reply(`
<b>🔥 حقیقت یا جرات دو نفره 🔥</b>

⚠️ برای شروع حتما به این بات‌ها /start بزن:
• @IrAiphoto_bot
• @irgametel_bot

یکی میزبان بشه و لینک دعوت بفرسته.
بازی فقط تو چت خصوصی با ربات انجام می‌شه.

اول جنسیتت رو انتخاب کن:
`, { 
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    [Markup.button.callback('👦 پسر', 'gender_boy'), Markup.button.callback('👧 دختر', 'gender_girl')],
    [Markup.button.callback('🎮 من میزبانم (ساخت لینک)', 'host')]
  ])
});
});

bot.action('gender_boy', async (ctx) => {
  ctx.session.gender = 'boy';
  await ctx.reply('جنسیت: پسر ✅');
  await ctx.answerCbQuery();
});

bot.action('gender_girl', async (ctx) => {
  ctx.session.gender = 'girl';
  await ctx.reply('جنسیت: دختر ✅');
  await ctx.answerCbQuery();
});

bot.action('host', async (ctx) => {
  if (!ctx.session.gender) {
    await ctx.reply('اول جنسیتت رو انتخاب کن!');
    await ctx.answerCbQuery();
    return;
  }

  const code = Math.random().toString(36).substring(7);
  ctx.session.inviteCode = code;
  ctx.session.isHost = true;

  await ctx.reply(`
<b>شما میزبان شدید! 🎉</b>

لینک دعوت:
https://t.me/truthsdares_bot?start=${code}

این لینک رو برای دوستت بفرست. وقتی جوین شد، بازی شروع می‌شه!
`, { parse_mode: 'HTML' });

  await ctx.answerCbQuery();
});

bot.command('admin', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  await ctx.reply('<b>👑 پنل ادمین</b>\nکاربران فعال و آمار به زودی کامل می‌شه!', { parse_mode: 'HTML' });
});

bot.launch();
console.log('ربات با موفقیت روشن شد!');
