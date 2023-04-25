const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.author.bot) {
      var matchHay = message.content.match(/([H|h][a]+y)|(H[A]+Y)/);
      var matchCarrot = message.content.match(/[C|c]arrot[s]?/);
      if (matchHay && matchCarrot) {
        await replyHayAndCarrots(message);
      } else if (matchHay) {
        await replyHay(message);
      } else if (matchCarrot) {
        await replyCarrots(message);
      }
    }
  },
};

async function replyHay(message) {
  console.log(
    'Found hay in "%s" from %s in %s',
    message.content,
    message.member.user.username,
    message.channel.name,
  );
  var num = Math.floor(Math.random() * 6);
  if (num === 0) {
    await message.reply("Fooood!");
  } else if (num === 1) {
    await message.reply("Yummy!");
  } else if (num === 2) {
    await message.reply("*nuzzles neck for the hay*");
  } else if (num === 3) {
    await message.reply("*tail flicking*");
  } else if (num === 4) {
    await message.reply("*nimbly steals the hay*");
  } else if (num === 5) {
    await message.reply("You suddenly feel a donkey breathing down your neck.");
  }
}

async function replyCarrots(message) {
  console.log(
    'Found carrots in "%s" from %s in %s',
    message.content,
    message.member.user.username,
    message.channel.name,
  );
  var num = Math.floor(Math.random() * 4);
  if (num === 0) {
    await message.reply("Oooooh.");
  } else if (num === 1) {
    await message.reply("Orange food!");
  } else if (num === 2) {
    await message.reply("*Noms it from your hand*");
  } else if (num === 3) {
    await message.reply("Crunchy.");
  }
}

async function replyHayAndCarrots(message) {
  console.log(
    'Found hay and carrots in "%s" from %s in %s',
    message.content,
    message.member.user.username,
    message.channel.name,
  );
  var num = Math.floor(Math.random() * 4);
  if (num === 0) {
    await message.reply("A FEAST!");
  } else if (num === 1) {
    await message.reply(
      "*You find the life squished out of you as the bot give you a super tight hug*",
    );
  } else if (num === 2) {
    await message.reply(
      "*The bot goes into shutdown cause you gave it so much food (not really)*",
    );
  } else if (num === 3) {
    await message.reply("Bestest day EVAAAAR");
  }
}
