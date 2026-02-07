const { Telegraf, Markup } = require('telegraf');
const LocalSession = require('telegraf-session-local');

const bot = new Telegraf('8589603393:AAE2eF3lD21B82S0XEZn0vstVTSvkv8u06M');

bot.use((new LocalSession({ database: 'sessions.json' })).middleware());

const ADMIN_ID = 6597261815;

bot.start(async (ctx) => {
  if (ctx.startPayload) {
    await ctx.reply(`خوش اومدی! کد دعوت: ${ctx.startPayload}\nبازی به زودی شروع می‌شه 🚀`);
    return;
  }

  await ctx.replyWithMarkdownV2(`
🔥 *حقیقت یا جرات دو نفره* 🔥

⚠️ برای شروع حتماً به این بات‌ها /start بزنید:
• @IrAiphoto_bot
• @irgametel_bot

یکی میزبان بشه و لینک دعوت بفرسته\\.
بازی فقط در چت خصوصی با ربات انجام می‌شه\\.

اول جنسیتت رو انتخاب کن:
`, Markup.inlineKeyboard([
    [Markup.button.callback('👦 پسر', 'gender_boy'), Markup.button.callback('👧 دختر', 'gender_girl')],
    [Markup.button.callback('🎮 من میزبانم \$$   ساخت لینک دعوت\   $$', 'host')]
  ]));
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
  const code = Math.random().toString(36).substring(7);
  ctx.session.inviteCode = code;
  ctx.session.isHost = true;
  await ctx.reply(`شما میزبان شدید! 🎉
