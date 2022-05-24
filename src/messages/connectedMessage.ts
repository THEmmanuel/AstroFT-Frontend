import { MessageContent, MessageType } from "../context/MessageContext";
import { LoginState, useWeb3 } from "../context/Web3Context";
import { sleep } from "../utils/flowutils";

// Build the URL for opening NFT in opensea
function buildURL() {
  const url_built = "https://opensea.io/";
  return url_built;
}

// ******************* Intro Wallet Connect *******************
export const welcomeMessage: MessageContent = {
  content: [
    "Beep Boop!",
    "Welcome to the PretzelDAO NFT Bakery!",
    "If it is your first time here, you can get a free Sugar Pretzel.\nYou can also have a look at our special Pretzels.",
  ],
  actions: [
    {
      content: "Free Pretzel",
      onClick: async (context, web3) => {
        await sleep(500);
        let address = web3.address;
        let newHist = await context.addMessage({
          content: "Free Pretzels sounds great!",
          type: MessageType.text,
          sendByUser: true,
        });
        if (address) {
          console.log("Wallet connected");
          // if first pretzel change to F´firstFreePretzelMessage. If not first first then change to freePretzelMessage
          await sleep(500);
          return context.addMessage(freePretzelMessage, newHist);
        } else {
          console.log("Wallet not connected");
          await sleep(500);
          return context.addMessage(connectWalletPolygonMessage, newHist);
        }
      },
    },
    {
      content: "Special Pretzels",
      onClick: async (context, web3) => {
        await sleep(500);
        let address = web3.address;
        let newHist = await context.addMessage({
          content: "Special Pretzels sounds interesting!",
          type: MessageType.text,
          sendByUser: true,
        });
        if (address) {
          console.log("Wallet connected");
          await sleep(500);
          return context.addMessage(freePretzelMessage, newHist);
        } else {
          await sleep(500);
          context.setBackground("inside_bakery.gif");
          return context.addMessage(connectWalletEthereumMessage, newHist);
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
};

export const connectWalletPolygonMessage: MessageContent = {
  content: [
    "Free Pretzels are stored on the Polygon Blockchain.",
    "In order to mint them, you need to connect your Polygon wallet.",
  ],
  actions: [
    {
      content: "Connect Metamask",
      onClick: async (context, web3) => {
        let loginState = LoginState.notInstalled;
        let newHist = await context.addMessage({
          content: "Connecting Metamask...",
          type: MessageType.text,
          sendByUser: true,
        });
        if (web3) {
          loginState = await web3.loginMetamask(true);
        }
        if (loginState == LoginState.notInstalled) {
          console.log("No metamask");
          await sleep(200);
          newHist = await context.addMessage(
            {
              content:
                "Metamask is not installed, please install it! \nYou can find a tutorial here: https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask",
              type: MessageType.text,
            },
            newHist
          );
          await sleep(1000);
          newHist = await context.addMessage(mainMenuMessage, newHist);

          return newHist;
        }
        if (loginState == LoginState.error) {
          await sleep(200);
          newHist = await context.addMessage(
            {
              content: "Metamask could not connect!",
              type: MessageType.text,
            },
            newHist
          );
          await sleep(1000);
          newHist = await context.addMessage(mainMenuMessage, newHist);

          return newHist;
        }
        if (!web3?.isCorrectChain()) {
          return context.addMessage(changeChainPolygonMessage, newHist);
        }
        await sleep(1500);
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "Use Wallet Connect",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Connecting Wallet...",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(1500);
        // TO-DO
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "What is a Wallet?",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "What is a Wallet?",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(1500);
        // TO-DO
        return context.addMessage(whatIsAWalletMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

export const connectWalletEthereumMessage: MessageContent = {
  content: [
    "Special Pretzels are stored on the Ethereum Blockchain.",
    "In order to mint them, you need to connect your Ethereum wallet.",
  ],
  actions: [
    {
      content: "Connect Metamask",
      onClick: async (context, web3) => {
        let loginState = LoginState.notInstalled;
        let newHist = await context.addMessage({
          content: "Connecting Metamask...",
          type: MessageType.text,
          sendByUser: true,
        });
        if (web3) {
          loginState = await web3.loginMetamask(true);
        }
        if (loginState == LoginState.notInstalled) {
          console.log("No metamask");
          await sleep(200);
          newHist = await context.addMessage(
            {
              content:
                "Metamask is not installed, please install it! \nYou can find a tutorial here: https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask",
              type: MessageType.text,
            },
            newHist
          );
          await sleep(1000);
          newHist = await context.addMessage(mainMenuMessage, newHist);

          return newHist;
        }
        if (loginState == LoginState.error) {
          await sleep(200);
          newHist = await context.addMessage(
            {
              content: "Metamask could not connect!",
              type: MessageType.text,
            },
            newHist
          );
          await sleep(1000);
          newHist = await context.addMessage(mainMenuMessage, newHist);

          return newHist;
        }
        if (!web3?.isCorrectChain()) {
          return context.addMessage(changeChainEthereumMessage, newHist);
        }
        await sleep(1500);
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "Use Wallet Connect",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Connecting Wallet...",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(1500);
        // TO-DO
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "What is a Wallet?",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "What is a Wallet?",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(1500);
        // TO-DO
        return context.addMessage(whatIsAWalletMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

export const whatIsAWalletMessage: MessageContent = {
  content: ["Description of what a wallet is to do"],
  actions: [
    {
      content: "Got it!",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Got it!",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(1500);
        // TO-DO return to Polygon or Ethereum
        return context.addMessage(connectWalletPolygonMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

export const whatIsAChainMessage: MessageContent = {
  content: ["Description of what a Chain is."],
  actions: [
    {
      content: "Got it!",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Got it!",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(1500);
        // TO-DO return to Polygon or Ethereum
        return context.addMessage(connectWalletPolygonMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

export const mainMenuMessage: MessageContent = {
  content: ["What else can I do for you?"],
  actions: [
    {
      content: "Free Pretzel",
      onClick: async (context, web3) => {
        await sleep(500);
        let address = web3.address;
        let newHist = await context.addMessage({
          content: "Free Pretzels sounds great!",
          type: MessageType.text,
          sendByUser: true,
        });
        if (address) {
          console.log("Wallet connected");
          await sleep(500);
          return context.addMessage(freePretzelMessage, newHist);
        } else {
          console.log("Wallet not connected");
          await sleep(500);
          return context.addMessage(connectWalletPolygonMessage, newHist);
        }
      },
    },
    {
      content: "Special Pretzels",
      onClick: async (context, web3) => {
        await sleep(500);
        let address = web3.address;
        let newHist = await context.addMessage({
          content: "Special Pretzels sounds interesting!",
          type: MessageType.text,
          sendByUser: true,
        });
        if (address) {
          console.log("Wallet connected");
          await sleep(500);
          return context.addMessage(freePretzelMessage, newHist);
        } else {
          await sleep(500);
          return context.addMessage(connectWalletEthereumMessage, newHist);
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
};

export const firstFreePretzelMessage: MessageContent = {
  content: [
    "Since it's your first pretzel, it's completely free. No gas either.",
    "Here you go, fresh out of the oven",
  ],
  actions: [
    {
      content: "Claim Pretzel",
      onClick: async (context, Web3Context, contractContext) => {
        await sleep(2000);
        const newHist = await context.addMessage({
          content: "Yes, give Pretzel!",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(4000);
        // TO-DO

        console.log("trying to mint now");
        console.log(contractContext);

        await contractContext.mintGaseless();

        // Mint should happen here
        return context.addMessage(freePretzelMessage2, newHist);
      },
    },
    {
      content: "Abort!",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "No, I changed my mind.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(mainMenuMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};
export const freePretzelMessage: MessageContent = {
  content: [
    "Since you already have your first Pretzel, you will now have to pay gas yourself.",
    "Do you still want your Pretzel?",
  ],
  actions: [
    {
      content: "Yes",
      onClick: async (context, Web3Context, contractContext) => {
        await sleep(2000);
        const newHist = await context.addMessage({
          content: "Yes, please!",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(4000);
        // TO-DO

        console.log("trying to mint now");
        console.log(contractContext);
        // To-DO not Gasless Mint
        await contractContext.mintGaseless();

        // Mint should happen here
        return context.addMessage(freePretzelMessage2, newHist);
      },
    },
    {
      content: "No",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "No, I changed my mind.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(mainMenuMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

export const changeChainPolygonMessage: MessageContent = {
  content: [
    "Your Wallet is connected! But we need to change the Chain to Polygon.",
  ],
  actions: [
    {
      content: "Change to Polygon!",
      onClick: async (context, web3) => {
        let newHist = await context.addMessage({
          content: "Changing to Polygon",
          type: MessageType.text,
          sendByUser: true,
        });
        await web3?.switchToEthereum();
        if (!web3?.isCorrectChain()) {
          return context.addMessage(changeChainPolygonMessage, newHist);
        }
        // TO-DO
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "What is a chain?",
      onClick: async (context) => {
        let newHist = await context.addMessage({
          content: "What is a chain?",
          type: MessageType.text,
          sendByUser: true,
        });
        return context.addMessage(whatIsAChainMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

export const changeChainEthereumMessage: MessageContent = {
  content: [
    "Your Wallet is connected! But we need to change the Chain to Ethereum.",
  ],
  actions: [
    {
      content: "Change to Ethereum!",
      onClick: async (context, web3) => {
        let newHist = await context.addMessage({
          content: "In my Metamask.",
          type: MessageType.text,
          sendByUser: true,
        });
        await web3?.switchToEthereum();
        if (!web3?.isCorrectChain()) {
          return context.addMessage(changeChainEthereumMessage, newHist);
        }
        // TO-DO
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "What is a chain?",
      onClick: async (context) => {
        return [];
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// ********* Intro After Not Taking Free Pretzel (Frame 27 - Inside Scene) ********
// TO-DO
// - Add transition to secret room if second option clicked
export const introMessage3: MessageContent = {
  content: [
    "I guess you're not a big Pretzel fan.",
    "Do you want to look at anything else?",
  ],
  actions: [
    {
      content: "Free Pretzel",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I do want a free pretzel.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "Special Pretzels",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I want to look at the special pretzels.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        return context.addMessage(specialPretzelMessage1, newHist);
      },
    },
    {
      content: "No, I'm good",
      onClick: async (context) => {
        await sleep(500);
        // TO-DO: Redirect to landing page with "Enter Bakery" sign
        // Therefore change the redirect below
        return context.addMessage(welcomeMessage);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// ********************* Intro After Free Pretzels (Frame 27 - Inside Scene) *******************
// TO-DO
// - Add transition to secret room if second option clicked
export const introAfterFreeMessage: MessageContent = {
  content: [
    "Boop Boop! Hope you enjoy those yummy Pretzels.",
    "I mean, who doesn't love Pretzels!",
    "So. Anything else I can do for you?",
  ],
  actions: [
    {
      content: "Another Pretzel",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I'd like another pretzel.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(freePretzelMessage5, newHist);
      },
    },
    {
      content: "Special Pretzels",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I'm curious about the special pretzel.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        // Transition to secret room
        return context.addMessage(specialPretzelMessage1, newHist);
      },
    },
    {
      content: "No, I'm good",
      onClick: async (context) => {
        await sleep(500);
        // TO-DO: Redirect to landing page with "Enter Bakery" sign
        return context.addMessage(welcomeMessage);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// ********************* Intro After Secret Room (Frame 27 - Inside Scene) *********************
// TO-DO
// - Add transition to secret room if second option clicked
export const introAfterSecretMessage: MessageContent = {
  content: [
    "And we're back!",
    "Hope you liked those special pretzels.",
    "What else can I do for you?",
  ],
  actions: [
    {
      content: "Free Pretzel",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I'd like a free pretzel.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(freePretzelMessage, newHist);
      },
    },
    {
      content: "Special Pretzels",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I want to look at the special pretzels.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        return context.addMessage(specialPretzelMessage1, newHist);
      },
    },
    {
      content: "No, I'm good",
      onClick: async (context) => {
        await sleep(500);
        // TO-DO: Redirect to landing page with "Enter Bakery" sign
        return context.addMessage(welcomeMessage);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// *********************************************************
// ********************* Free Pretzels *********************

/*************** Wallet Sign-In [Archived] (Frame 75) *************
TO-DO:
 - execute connect with Metamask
 - execute connect with Wallet Connect
export const freePretzelMessage1: MessageContent = {
  content: [
    'Delicious choice!',
    'Where should I put your free Pretzel?',
  ],
  actions: [
    {
      content: 'In my Metamask.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'In my Metamask.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(1500)
        // TO-DO
        return context.addMessage(freePretzelMessage, newHist)
      },
    },
    {
      content: 'In my Wallet Connect.',
      onClick: async (context) => {
        await sleep(500)
        const newHist = await context.addMessage({
          content: 'In my Wallet Connect.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(1500)
        // TO-DO
        return context.addMessage(freePretzelMessage, newHist)
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
}
*/

// ************ Execute Mint (Frame 77 - Inside Scene) ********************
// TO-DO:
// - sign via Wallet and execute mint contract
// export const freePretzelMessage: MessageContent = {
//   content: [
//     "Delicious choice!",
//     "Since it's your first pretzel, it's completely free. No gas either.",
//     "So, shall I give you your Pretzel?",
//   ],
//   actions: [
//     {
//       content: "Yes",
//       onClick: async (context, Web3Context, contractContext) => {
//         await sleep(2000);
//         const newHist = await context.addMessage({
//           content: "Yes, give Pretzel!",
//           type: MessageType.text,
//           sendByUser: true,
//         });
//         await sleep(4000);
//         // TO-DO

//         console.log("trying to mitn now");
//         console.log(contractContext);

//         await contractContext.mintGaseless();

//         // Mint should happen here
//         return context.addMessage(freePretzelMessage3, newHist);
//       },
//     },
//     {
//       content: "No",
//       onClick: async (context) => {
//         await sleep(500);
//         const newHist = await context.addMessage({
//           content: "No, I changed my mind.",
//           type: MessageType.text,
//           sendByUser: true,
//         });
//         await sleep(500);
//         return context.addMessage(freePretzelMessage, newHist);
//       },
//     },
//   ],
//   delay: 400,
//   type: MessageType.text,
// };

// ************* Show Pretzel (Frame 79 - Inside Scene) *******************
// TO-DO:
// - Display preview image of pretzel in text
// - add proper Opensea URL here
// - Get the contract address and build the URL
// - Structure: opensea.io/asset/<Chain>/<Contract_Address>/<Number>
export const freePretzelMessage2: MessageContent = {
  content: [
    "I put your Pretzel in your wallet!",
    "/logo192.png",
    "Do you also want to look at your Pretzel on Opensea?",
  ],
  actions: [
    {
      content: "Yes",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Yes, let me take a look.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        const url = buildURL();
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
        return context.addMessage(freePretzelMessage4, newHist);
      },
    },
    {
      content: "No",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(freePretzelMessage4, newHist);
      },
    },
  ],
  delay: 400,
  type: [MessageType.text, MessageType.image, MessageType.text],
};

// *************** Redirect Intro (Frame 80 - Inside Scene) ***************
// TO-DO:
// - Redirect to landing page with "Enter Bakery" sign
export const freePretzelMessage4: MessageContent = {
  content: [
    "I hope you like your Pretzel!",
    "So, anything else I can do for you?",
  ],
  actions: [
    {
      content: "Another Pretzel",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I want another regular Pretzel",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(freePretzelMessage5, newHist);
      },
    },
    {
      content: "Special Pretzels",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "I'm curious about the special pretzels.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(specialPretzelMessage1, newHist);
      },
    },
    {
      content: "No",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "No, I think I'm done.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        return context.addMessage(introAfterFreeMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// ************** Another Pretzel (Frame 81 - Inside Scene) ***************
// - sign via Wallet and execute mint contract
export const freePretzelMessage5: MessageContent = {
  content: [
    "Oh yes! More Pretzels, more fun!",
    "However, the next pretzels will cost a little bit.",
    "Do you want another one?",
  ],
  actions: [
    {
      content: "Yes",
      onClick: async (context, web3Context, contractContext) => {
        await sleep(2000);
        const newHist = await context.addMessage({
          content: "Yes, I'll take another Pretzel!",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(4000);
        // TO-DO
        // Mint should happen here

        await contractContext.mintSugarPretzel();

        return context.addMessage(freePretzelMessage3, newHist);
      },
    },
    {
      content: "No",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "No, I changed my mind.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(introAfterFreeMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// *********************************************************
// ******************** Special Pretzels *******************

// *********** Secret Room Intro (Frame 61 - Secret Scene) ****************
// TO-DO
// - Here the idea was to have a direct "shop" of the pretzels in the chat (see Frame 61)
// - User scrolls through pretzels, clicks on the one they like, and can then mint
// - Transition back to regular bakery
export const specialPretzelMessage1: MessageContent = {
  content: [
    "Welcome to my secret stash. OOHHHEEEE!",
    "Here I have the finest Pretzels baked by our PretzelDAO.",
    "They're in limited supply, so be quick!",
    "Have a look below and click on the one you like.",
    "(MarketPlace){1/1 Pretels Here}",
  ],
  actions: [
    {
      content: "Buy Pretzel",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Buy a special pretzel.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        // Sign wallet and mint pretzel
        return context.addMessage(specialPretzelMessage2, newHist);
      },
    },
    {
      content: "Go Back",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Actually, I don't want to buy one.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        // Transition back to regular inside bakery scene
        return context.addMessage(introAfterSecretMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// ******************* Show Purchase (Frame 85 - Secret Scene) **************************
// TO-DO:
// - Display preview of final purchased NFT
// - Link to Opensea
export const specialPretzelMessage2: MessageContent = {
  content: [
    "I put your pretzel in your Wallet!",
    "(image){Preview of final bought pretzel)",
    "Do you want to look at it on Opensea as well?",
  ],
  actions: [
    {
      content: "Yes",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Yes, let's go to Opensea",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        const url = buildURL();
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
        return context.addMessage(specialPretzelMessage3, newHist);
      },
    },
    {
      content: "No",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        return context.addMessage(specialPretzelMessage3, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// ********************* Further Purchase (Frame X - Secret Scene) ****************
// TO-DO
// - Here again the direct "shop" of the pretzels in the chat (see Frame 61)
// - User scrolls through pretzels, clicks on the one they like, and can then mint
// - Transition back to regular pretzel bakery scene
export const specialPretzelMessage3: MessageContent = {
  content: [
    "Feel free to buy another special pretzel!",
    "Or let me know if you are done.",
    "(MarketPlace){1/1 Pretels Here}",
  ],
  actions: [
    {
      content: "Buy Pretzel",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Buy a special pretzel.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        // Sign wallet and mint pretzel
        return context.addMessage(specialPretzelMessage2, newHist);
      },
    },
    {
      content: "I'm done",
      onClick: async (context) => {
        await sleep(500);
        const newHist = await context.addMessage({
          content: "Let's go back. I'm done.",
          type: MessageType.text,
          sendByUser: true,
        });
        await sleep(500);
        // TO-DO
        // Transition back to regular inside bakery scene
        return context.addMessage(introAfterSecretMessage, newHist);
      },
    },
  ],
  delay: 400,
  type: MessageType.text,
};

// export const connectedMessage: MessageContent = new MessageContent(
//   MessageType.text,
//   [
//     'Yay! you connected your wallet',
//     'you are literally the best',
//     'we all love you!',
//   ],
//   [
//     {
//       content: 'Continue',
//       onClick: async (context) => {
//         await sleep(500)
//         return context.addMessage(connectedMessage)
//         // return context.addMessage(connectedMessage)
//       },
//     },
//     {
//       content: 'Continue Anyways',
//       onClick: async (context) => {
//         await sleep(5000)
//         return context.addMessage(connectedMessage)
//         // return context.addMessage(connectedMessage)
//       },
//     },
//   ],
//   400,
// )

// export const connectedMessage: MessageContent = new MessageContent(
//   MessageType.text,
//   'Yay! you connected yout wallet',
//   [
//     {
//       content: 'Continue',
//       onClick: async (context) => {
//         await sleep(2000)
//         return context.addMessage(connectedMessage)
//         return context.addMessage(connectedMessage)
//       },
//     },
//   ],
// )

// export const connectedMessage2 = new MessageContent(
//   MessageType.text,
//   'Yay! you connected yout wallet',
//   [
//     {
//       content: 'Continue',
//       onClick: async (context) => context.addMessage(connectedMessage),
//     },
//   ],
// )
