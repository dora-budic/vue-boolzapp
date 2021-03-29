var app = new Vue ({
  el: "#root",
  data: {
    currentIndex: 0,
    userMessage: '',
    searchInput:  '',
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
  methods: {
    selectContact: function (contact) {
      this.currentIndex = this.contacts.indexOf(contact);
      this.searchInput = '';
    },
    getTime: function (date) {
      let dateTime = date.split(" ");
      let time = dateTime[1].split(":");
      return `${time[0]}:${time[1]}`;
    },
    sendMessage: function (array) {
      let obj = {
        date: dayjs(new Date()).format('DD/MM/YYYY H:mm:ss'),
        text: this.userMessage,
        status: 'sent'
      }
      array.push(obj);
      this.userMessage = '';

      setTimeout(function () {
        let obj = {
          date: dayjs(new Date()).format('DD/MM/YYYY H:mm:ss'),
          text: 'Ok',
          status: 'received'
        }
        array.push(obj);
      },2000);
    },
    search: function (text) {
      let contactsFiltered;
      if (text == '') {
        return this.contacts;
      } else {
        contactsFiltered = this.contacts.filter((item) =>
        item.name.toLowerCase().startsWith(text.toLowerCase()));
        return contactsFiltered;
      }
    }
  },
  computed: {
    messagesArray: function () {
      return this.contacts[this.currentIndex].messages;
    },
    lastMessage: function () {
      return this.messagesArray.length - 1;
    }
  }
});
