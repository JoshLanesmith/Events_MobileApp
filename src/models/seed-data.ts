import {User} from "./user.model";
import {EventObject} from "./event.model";
import {Comment, UserReference} from "./comment.model";

export class SeedData {
  userTypesData = [
    {type: 'user'},
    {type: 'admin'},
  ];

  users: User[] = [
    new User('admin', 'admin', 'admin', '2000-01-01', 'admin@email.com', '', 'admin'),
    new User('Susie', 'Benton', 'Susie', '2000-01-01', 'susie@email.com', '', 'user'),
    new User('Bob', 'Smith', 'Bob', '2000-01-01', 'bob@email.com', '', 'user'),
    new User('Gordon', 'Wallace', 'Gordon', '2000-01-01', 'gordon@email.com', '', 'user'),
    new User('Jake', 'Williams', 'Jake', '2000-01-01', 'jake@email.com', '', 'user'),
    new User('Lisa', 'Swan', 'Lisa', '2000-01-01', 'lisa@email.com', '', 'user'),
    new User('Sammy', 'Grant', 'Sammy', '2000-01-01', 'sammy@email.com', '', 'user'),
    new User('Justin', 'Slate', 'Justin', '2000-01-01', 'justin@email.com', '', 'user'),
    new User('Amanda', 'Walter', 'Amanda', '2000-01-01', 'amanda@email.com', '', 'user'),
    new User('Jerry', 'Seinfeld', 'Jerry', '2000-01-01', 'jerry@email.com', '', 'user'),
    new User('Tommy', 'Turner', 'Tommy', '2000-01-01', 'tommy@email.com', '', 'user'),
    new User('Billy', 'Bishop', 'Billy', '2000-01-01', 'billy@email.com', '', 'user'),
    new User('Hank', 'McCoy', 'Hank', '2000-01-01', 'hank@email.com', '', 'user'),
    new User('Fred', 'Flinstone', 'Fred', '2000-01-01', 'fred@email.com', '', 'user'),
    new User('Robert', 'Redford', 'Robert', '2000-01-01', 'robert@email.com', '', 'user'),
    new User('Richard', 'VanDyke', 'Richard', '2000-01-01', 'richard@email.com', '', 'user'),
    new User('Persephanii', 'Smith', 'Persephanii', '2000-01-01', 'persephanii@email.com', '', 'user')
  ];

  events: EventObject[] = [
    new EventObject('Tech Symposium', '2024-04-30', '151 Charles St W Suite 100, Kitchener, ON',
      'A gathering of leading professionals discussing the latest advancements and trends in technology.',
      50, 0, 1),
    new EventObject('Wellness Retreat', '2024-05-03', '91 Albert St, Waterloo, ON',
      'An immersive experience focused on rejuvenating the mind, body, and spirit through various wellness activities.',
      10, 0, 2),
    new EventObject('Artisanal Food Fair', '2024-05-08', '80 Schneider Ave, Kitchener, ON',
      'A celebration of locally sourced and handcrafted food and beverages from talented artisans.',
      500, 0, 3),
    new EventObject('Charity Gala Dinner', '2024-05-30', '665 King St N, Waterloo, ON',
      'An elegant evening event aimed at raising funds and awareness for a charitable cause through dining and entertainment.',
      350, 0, 1),
    new EventObject('Science Fiction Convention', '2024-06-14', '425 Bingemans Centre Dr, Kitchener',
      'A gathering of science fiction enthusiasts celebrating their love for the genre through panels, cosplay, and special guest appearances.',
      290, 0, 1),
    new EventObject('Wine Tasting Event', '2024-06-18', '70 Victoria St N Unit B, Kitchener, ON ',
      'A sophisticated affair offering attendees the chance to sample a selection of fine wines from around the world.',
      6, 0, 4),
    new EventObject('Sustainable Living Expo', '2024-06-26', '425 Bingemans Centre Dr, Kitchener, ON',
      'An educational event showcasing eco-friendly products, services, and practices to promote sustainable living.',
      290, 0, 5),
    new EventObject('Fashion Show', '2024-07-08', '10 King St W, Kitchener, ON',
      'A glamorous runway presentation featuring the latest designs from emerging and established fashion designers.',
      90, 0, 6),
    new EventObject('Film Screening Series', '2024-07-17', '50 Young St W, Waterloo, ON',
      'A curated selection of thought-provoking films spanning various genres, screened over multiple days.',
      320, 0, 7)
  ];

  comments: Comment[] = [
    new Comment(new UserReference(1, 'admin'), 1, '2024-02-03', 'Looking forward to the event'),
    new Comment(new UserReference(2, 'Susie'), 1, '2024-02-04', 'Excited to see what\'s in store!'),
    new Comment(new UserReference(3, 'Bob'), 1, '2024-02-05', 'Counting down the days!'),
    new Comment(new UserReference(4, 'Gordon'), 2, '2024-02-06', 'This is going to be epic!'),
    new Comment(new UserReference(5, 'Jake'), 2, '2024-02-07', 'Can\'t wait to network with everyone!'),
    new Comment(new UserReference(6, 'Lisa'), 3, '2024-02-08', 'Hoping to learn a lot from this event!'),
    new Comment(new UserReference(7, 'Sammy'), 4, '2024-02-09', 'Ready to be inspired!'),
    new Comment(new UserReference(8, 'Justin'), 5, '2024-02-10', 'Bringing my A-game!'),
    new Comment(new UserReference(9, 'Amanda'), 5, '2024-02-11', 'Let\'s make some meaningful connections!'),
    new Comment(new UserReference(10, 'Jerry'), 5, '2024-02-12', 'Looking forward to the keynote speakers!'),
    new Comment(new UserReference(11, 'Tommy'), 5, '2024-02-13', 'Hyped for this event!'),
    new Comment(new UserReference(12, 'Billy'), 5, '2024-02-14', 'I\'ve been waiting for this!'),
    new Comment(new UserReference(13, 'Hank'), 5, '2024-02-15', 'Expecting great things!'),
    new Comment(new UserReference(14, 'Fred'), 6, '2024-02-16', 'Ready to be amazed!'),
    new Comment(new UserReference(15, 'Robert'), 6, '2024-02-17', 'Let\'s do this!'),
    new Comment(new UserReference(16, 'Richard'), 6, '2024-02-18', 'I\'m all in!'),
    new Comment(new UserReference(1, 'admin'), 6, '2024-02-19', 'Can\'t wait to meet everyone!'),
    new Comment(new UserReference(2, 'Susie'), 6, '2024-02-20', 'The anticipation is real!'),
    new Comment(new UserReference(3, 'Bob'), 6, '2024-02-21', 'Ready to be inspired!'),
    new Comment(new UserReference(4, 'Gordon'), 6, '2024-02-22', 'This event is going to be unforgettable!'),
    new Comment(new UserReference(5, 'Jake'), 7, '2024-02-23', 'Excited to learn and grow!'),
    new Comment(new UserReference(6, 'Lisa'), 7, '2024-02-24', 'Let\'s make memories!'),
    new Comment(new UserReference(7, 'Sammy'), 7, '2024-02-25', 'Hoping to connect with like-minded individuals!'),
    new Comment(new UserReference(8, 'Justin'), 7, '2024-02-26', 'Bringing my enthusiasm!'),
    new Comment(new UserReference(9, 'Amanda'), 7, '2024-02-27', 'Ready to be inspired!'),
    new Comment(new UserReference(1, 'admin'), 7, '2024-02-28', 'Looking forward to an amazing event!'),
    new Comment(new UserReference(11, 'Tommy'), 7, '2024-02-29', 'Can\'t wait to see what\'s in store!'),
    new Comment(new UserReference(12, 'Billy'), 7, '2024-03-01', 'Let\'s make it memorable!'),
    new Comment(new UserReference(13, 'Hank'), 7, '2024-03-02', 'This is going to be awesome!'),
    new Comment(new UserReference(14, 'Fred'), 7, '2024-03-03', 'Ready to be inspired!'),
    new Comment(new UserReference(15, 'Robert'), 7, '2024-03-04', 'Counting down the days!'),
    new Comment(new UserReference(16, 'Richard'), 8, '2024-03-05', 'Excited to learn new things!'),
    new Comment(new UserReference(17, 'Persephanii'), 8, '2024-03-06', 'Let\'s make it a memorable event!'),
    new Comment(new UserReference(2, 'Susie'), 8, '2024-03-07', 'I\'m so ready for this!'),
    new Comment(new UserReference(3, 'Bob'), 8, '2024-03-08', 'Looking forward to an amazing event!'),
    new Comment(new UserReference(4, 'Gordon'), 8, '2024-03-09', 'Ready to be inspired!'),
    new Comment(new UserReference(5, 'Jake'), 8, '2024-03-10', 'Hyped for this event!'),
    new Comment(new UserReference(6, 'Lisa'), 8, '2024-03-11', 'Counting down the days!'),
    new Comment(new UserReference(1, 'admin'), 8, '2024-03-12', 'Let\'s make it unforgettable!'),
    new Comment(new UserReference(8, 'Justin'), 9, '2024-03-13', 'Ready for an amazing experience!'),
    new Comment(new UserReference(9, 'Amanda'), 9, '2024-03-14', 'Can\'t wait to meet everyone!'),
    new Comment(new UserReference(10, 'Jerry'), 9, '2024-03-15', 'Bringing my excitement!'),
    new Comment(new UserReference(11, 'Tommy'), 9, '2024-03-16', 'Let\'s make it memorable!'),
    new Comment(new UserReference(12, 'Billy'), 3, '2024-03-17', 'Ready to be inspired!'),
    new Comment(new UserReference(13, 'Hank'), 3, '2024-03-18', 'Excited to learn new things!'),
    new Comment(new UserReference(14, 'Fred'), 3, '2024-03-19', 'Looking forward to an amazing event!'),
    new Comment(new UserReference(15, 'Robert'), 3, '2024-03-20', 'Hyped for this event!'),
    new Comment(new UserReference(16, 'Richard'), 2, '2024-03-21', 'This event is going to be epic!'),
    new Comment(new UserReference(17, 'Persephanii'), 2, '2024-03-22', 'Let\'s make it unforgettable!'),
  ];

  addGuestsToEvents() {
    this.events[0].registeredUserIds.push(1);
    this.events[0].registeredUserIds.push(2);
    this.events[0].registeredUserIds.push(3);
    this.events[1].registeredUserIds.push(4);
    this.events[1].registeredUserIds.push(5);
    this.events[1].registeredUserIds.push(16);
    this.events[1].registeredUserIds.push(17);
    this.events[2].registeredUserIds.push(6);
    this.events[2].registeredUserIds.push(12);
    this.events[2].registeredUserIds.push(13);
    this.events[2].registeredUserIds.push(14);
    this.events[2].registeredUserIds.push(15);
    this.events[3].registeredUserIds.push(7);
    this.events[4].registeredUserIds.push(8);
    this.events[4].registeredUserIds.push(9);
    this.events[4].registeredUserIds.push(10);
    this.events[4].registeredUserIds.push(11);
    this.events[4].registeredUserIds.push(12);
    this.events[4].registeredUserIds.push(13);
    this.events[5].registeredUserIds.push(14);
    this.events[5].registeredUserIds.push(15);
    this.events[5].registeredUserIds.push(16);
    this.events[5].registeredUserIds.push(2);
    this.events[5].registeredUserIds.push(3);
    this.events[5].registeredUserIds.push(4);
    this.events[6].registeredUserIds.push(5);
    this.events[6].registeredUserIds.push(6);
    this.events[6].registeredUserIds.push(7);
    this.events[6].registeredUserIds.push(8);
    this.events[6].registeredUserIds.push(9);
    this.events[6].registeredUserIds.push(10);
    this.events[6].registeredUserIds.push(11);
    this.events[6].registeredUserIds.push(12);
    this.events[6].registeredUserIds.push(13);
    this.events[6].registeredUserIds.push(14);
    this.events[6].registeredUserIds.push(15);
    this.events[7].registeredUserIds.push(16);
    this.events[7].registeredUserIds.push(17);
    this.events[7].registeredUserIds.push(1);
    this.events[7].registeredUserIds.push(2);
    this.events[7].registeredUserIds.push(3);
    this.events[7].registeredUserIds.push(4);
    this.events[7].registeredUserIds.push(5);
    this.events[7].registeredUserIds.push(6);
    this.events[8].registeredUserIds.push(8);
    this.events[8].registeredUserIds.push(9);
    this.events[8].registeredUserIds.push(10);
    this.events[8].registeredUserIds.push(11);

    this.events.forEach((item) => {
      item.guestCount = item.registeredUserIds.length;
    })
  }


}
