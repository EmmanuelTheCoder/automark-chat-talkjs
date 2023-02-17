(function(t,a,l,k,j,s){
    s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
    ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
    .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);

    Talk.ready.then(function() {
        
        const support = new Talk.User({
            id: '123456',
            name: 'Lynda from Support',
            email: 'lynda@test.app',
            photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
            welcomeMessage: 'Hi! I am Lynda from support, how may I be of help!',
            role: 'support'
        });

    window.talkSession = new Talk.Session({
        appId: 'txi2DjQS',
        me: support,
    });
    const customer1 = new Talk.User({
        id: '654321',
      name: 'Smith',
      email: 'smith@example.com',
      photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
      welcomeMessage: 'Hey, I have some troubles with...',
      role: 'customer'
    });
    
    const customer2 = new Talk.User({
      id: '1000001',
      name: 'John',
      email: 'john@example.com',
      photoUrl: 'https://talkjs.com/images/avatar-4.jpg',
      welcomeMessage: 'Hey, I want to make an inquiry...',
      role: 'customer'
    });
    
    
    const conversation = talkSession.getOrCreateConversation(
        Talk.oneOnOneId(support, customer1)
        );
    conversation.setAttributes({
        subject: "Payment Issue"
    })
    conversation.setParticipant(support);
    conversation.setParticipant(customer1);
  
    const otherConversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(support, customer2));
    otherConversation.setAttributes({ subject: "Inquiry"});
    
    otherConversation.setParticipant(support);
    otherConversation.setParticipant(customer2);
    
    //const inbox = talkSession.createInbox({ selected: otherConversation });
    const inbox = talkSession.createInbox();
    inbox.setFeedFilter({ custom: { answered: ["==", "false"] } })


    
    inbox.mount(document.getElementById('talkjs-container'));

    
})


