var app = new Vue ({
  el: "#root",
  data: {
    currentIndex: 0,
    userMessage: '',
    searchInput:  '',
    messageIndex: null,
    mobileChat: false,
    emoji: emoji,
    emojiSmiles: [],
    emojiAnimals: [],
    showEmoji: false,
    smile: true,
    animal: false,
    contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Hai portato a spasso il cane?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Ricordati di dargli da mangiare',
						status: 'sent'
					},
					{
						date: '10/01/2020 16:15:22',
						text: 'Tutto fatto!',
						status: 'received'
					}
				],
			},
			{
				name: 'Fabio',
				avatar: '_2',
				visible: true,
				messages: [
					{
						date: '20/03/2020 16:30:00',
						text: 'Ciao come stai?',
						status: 'sent'
					},
					{
						date: '20/03/2020 16:30:55',
						text: 'Bene grazie! Stasera ci vediamo?',
						status: 'received'
					},
					{
						date: '20/03/2020 16:35:00',
						text: 'Mi piacerebbe ma devo andare a fare la spesa.',
						status: 'sent'
					}
				],
			},
			{
				name: 'Samuele',
				avatar: '_3',
				visible: true,
				messages: [
					{
						date: '28/03/2020 10:10:40',
						text: 'La Marianna va in campagna',
						status: 'received'
					},
					{
						date: '28/03/2020 10:20:10',
						text: 'Sicuro di non aver sbagliato chat?',
						status: 'sent'
					},
					{
						date: '28/03/2020 16:15:22',
						text: 'Ah scusa!',
						status: 'received'
					}
				],
			},
			{
				name: 'Luisa',
				avatar: '_4',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Lo sai che ha aperto una nuova pizzeria?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Si, ma preferirei andare al cinema',
						status: 'received'
					}
				],
			},
		]
  },
  created() {
    // Creo gli emoticons
    for (var i = 0; i < 296; i++) {
      if (i != 17 && i != 47) {
        this.emojiSmiles.push(this.emoji[i]);
      }
    }
    for (var i = 698; i < 800; i++) {
      if (i != 17 && i != 47) {
        this.emojiAnimals.push(this.emoji[i]);
      }
    }
  },
  computed: {
    // Prendo l'array di messagi del contact attivo
    messagesArray: function () {
      return this.contacts[this.currentIndex].messages;
    },
    // Prendo la posizione dell'ultimo messagio del contact attivo
    lastMessage: function () {
      return this.messagesArray.length - 1;
    },
  },
  methods: {
    // Prendo la posizione del contact cliccato,
    // cambio la condizione per visualizzare chat e nascondere contatti (versione mobile),
    // pulisco il valore di input(search)
    selectContact: function (contact) {
      this.currentIndex = this.contacts.indexOf(contact);
      this.mobileChat = true;
      this.searchInput = '';
    },
    // cambio la condizione per visualizzare contatti e nascondere chat,
    goBack: function () {
      this.mobileChat = false;
    },
    // Dalla data prendo solo l'ora e minuti
    getTime: function (date) {
      let dateTime = date.split(" ");
      let time = dateTime[1].split(":");
      return `${time[0]}:${time[1]}`;
    },
    // Metto il messaggio inviato/ricevuto nell'array
    sendMessage: function () {
      const index = this.currentIndex;
      let obj = {
        date: dayjs().format('DD/MM/YYYY H:mm:ss'),
        text: this.userMessage,
        status: 'sent'
      }
      this.contacts[index].messages.push(obj);
      this.userMessage = '';
      this.showEmoji = false;
      this.smile = true;
      this.animal = false;

      setTimeout(() => {
        const newMessages = [
          'Ciao','Ok', 'Grazie', 'Prego', 'Bene, e tu?',
          'Non posso, ho un impegno.', 'Ottimo!'];
        let max = newMessages.length - 1;
        let randomIndex = Math.floor(Math.random() * (max + 1));
        let obj = {
          date: dayjs().format('DD/MM/YYYY H:mm:ss'),
          text: newMessages[randomIndex],
          status: 'received'
        }
        this.contacts[index].messages.push(obj);
      },1000);
    },
    // Cancello il messagio cliccato,
    // se l'array messagio vuoto > inserisco la data come l'ultimo accesso,
    // dimostro il prossimo contatto
    deleteMessage: function (index) {
      if (this.messagesArray.length == 1) {
        this.messagesArray.splice(index,1);
        this.contacts[this.currentIndex].lastActive = dayjs().format('DD/MM/YYYY H:mm:ss');
        if (this.currentIndex == this.contacts.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
      } else {
        this.messagesArray.splice(index,1);
      }
    },
    // Condizioni per visualizzare il contatto nella lista
    showContact: function (index) {
      return (this.currentIndex == index ||
      this.contacts[index].messages.length != 0 || this.searchInput != '') &&
      this.contacts[index].name.toLowerCase().includes(this.searchInput.toLowerCase())
    },
    // Chiudo la finestra con emoticon
    closeEmoticon: function () {
      this.showEmoji = false;
      this.smile = true;
      this.animal = false;
    },
    // Inserisco emoticon scelto nell'input del messago da mandare
    addToMess: function (emoji) {
      this.userMessage += emoji;
      this.$refs.inputFocus.focus();
    }
  },
});
