export interface TriviaQuestion {
  question: string;
  choices: string[];
  answer: number; // index into choices
}

export interface TriviaLevel {
  name: string;
  description: string;
  questions: TriviaQuestion[];
}

export const triviaLevels: TriviaLevel[] = [
  {
    name: "Recruit",
    description: "Basic facts about the Great War",
    questions: [
      {
        question: "What year did World War I begin?",
        choices: ["1912", "1914", "1916", "1918"],
        answer: 1,
      },
      {
        question: "What event is widely considered the spark that started WWI?",
        choices: [
          "The sinking of the Lusitania",
          "The invasion of Belgium",
          "The assassination of Archduke Franz Ferdinand",
          "The Zimmermann Telegram",
        ],
        answer: 2,
      },
      {
        question: "Which countries made up the Triple Entente at the start of the war?",
        choices: [
          "Germany, Austria-Hungary, Italy",
          "France, Russia, Britain",
          "France, Germany, Russia",
          "Britain, Italy, Japan",
        ],
        answer: 1,
      },
      {
        question: "On what date did the Armistice end the fighting?",
        choices: [
          "November 11, 1918",
          "June 28, 1919",
          "October 3, 1918",
          "December 25, 1918",
        ],
        answer: 0,
      },
      {
        question: "What was 'No Man's Land'?",
        choices: [
          "A neutral country during the war",
          "The area between opposing trenches",
          "The name for Germany's eastern front",
          "A British military camp",
        ],
        answer: 1,
      },
      {
        question: "Which country did the U.S. declare war on to enter WWI?",
        choices: ["Austria-Hungary", "Ottoman Empire", "Germany", "Bulgaria"],
        answer: 2,
      },
      {
        question: "What treaty officially ended WWI?",
        choices: [
          "Treaty of Paris",
          "Treaty of Versailles",
          "Treaty of Brest-Litovsk",
          "Treaty of Trianon",
        ],
        answer: 1,
      },
      {
        question: "What new weapon was first used in large numbers during WWI?",
        choices: ["Nuclear bombs", "Machine guns", "Tanks", "Drones"],
        answer: 2,
      },
      {
        question: "Which side did the Ottoman Empire fight on?",
        choices: [
          "Allied Powers",
          "Central Powers",
          "They remained neutral",
          "They switched sides mid-war",
        ],
        answer: 1,
      },
      {
        question: "What was the name of the passenger ship sunk by a German U-boat in 1915?",
        choices: ["Titanic", "Britannic", "Lusitania", "Olympic"],
        answer: 2,
      },
    ],
  },
  {
    name: "Soldier",
    description: "Battles, strategy & key figures",
    questions: [
      {
        question: "The Battle of the Somme took place in which year?",
        choices: ["1914", "1915", "1916", "1917"],
        answer: 2,
      },
      {
        question: "Who was the commander of the American Expeditionary Forces?",
        choices: [
          "Douglas MacArthur",
          "John J. Pershing",
          "Dwight Eisenhower",
          "George Patton",
        ],
        answer: 1,
      },
      {
        question: "The Gallipoli Campaign was an attempt to seize control of what strait?",
        choices: [
          "Strait of Gibraltar",
          "Strait of Hormuz",
          "Strait of Malacca",
          "Dardanelles",
        ],
        answer: 3,
      },
      {
        question: "What was the 'Schlieffen Plan'?",
        choices: [
          "Germany's plan to defeat France quickly, then turn to Russia",
          "Britain's naval blockade strategy",
          "Austria-Hungary's invasion of Serbia",
          "The Ottoman plan to capture the Suez Canal",
        ],
        answer: 0,
      },
      {
        question: "Which battle is known for the first large-scale use of poison gas by Germany?",
        choices: [
          "Battle of Verdun",
          "Second Battle of Ypres",
          "Battle of the Marne",
          "Battle of Tannenberg",
        ],
        answer: 1,
      },
      {
        question: "Who was the Kaiser of Germany during WWI?",
        choices: [
          "Wilhelm I",
          "Frederick III",
          "Wilhelm II",
          "Otto von Bismarck",
        ],
        answer: 2,
      },
      {
        question: "The Battle of Verdun lasted approximately how many months?",
        choices: ["3 months", "6 months", "10 months", "12 months"],
        answer: 2,
      },
      {
        question: "Which country switched from the Central Powers to the Allied side during the war?",
        choices: ["Bulgaria", "Romania", "Italy", "Ottoman Empire"],
        answer: 2,
      },
      {
        question: "What was the Zimmermann Telegram?",
        choices: [
          "A German proposal for Mexico to ally against the U.S.",
          "A British coded message intercepted by Germany",
          "A French surrender offer",
          "A Russian peace proposal",
        ],
        answer: 0,
      },
      {
        question: "The Battle of Jutland was the largest naval battle of WWI. Where did it take place?",
        choices: [
          "English Channel",
          "Mediterranean Sea",
          "North Sea",
          "Baltic Sea",
        ],
        answer: 2,
      },
    ],
  },
  {
    name: "Officer",
    description: "Deep knowledge & lesser-known facts",
    questions: [
      {
        question:
          "What was the 'Race to the Sea' in 1914?",
        choices: [
          "A naval competition between Britain and Germany",
          "Both sides trying to outflank each other, extending trenches to the coast",
          "The Ottoman advance toward the Suez Canal",
          "The retreat of Russian forces to Baltic ports",
        ],
        answer: 1,
      },
      {
        question: "The Sykes-Picot Agreement secretly divided what region?",
        choices: [
          "The Balkans",
          "Eastern Europe",
          "The Middle East",
          "Sub-Saharan Africa",
        ],
        answer: 2,
      },
      {
        question: "What was the 'Brusilov Offensive'?",
        choices: [
          "A German attack on Verdun",
          "A Russian offensive that was one of the most successful Allied operations",
          "A British advance at the Somme",
          "An Ottoman attack on the Caucasus",
        ],
        answer: 1,
      },
      {
        question: "Which ace pilot was known as the 'Red Baron'?",
        choices: [
          "Eddie Rickenbacker",
          "Manfred von Richthofen",
          "René Fonck",
          "Albert Ball",
        ],
        answer: 1,
      },
      {
        question:
          "The Christmas Truce of 1914 is famously remembered for what activity between opposing soldiers?",
        choices: [
          "Exchanging prisoners",
          "Playing football (soccer)",
          "Sharing a formal dinner",
          "Signing a temporary peace treaty",
        ],
        answer: 1,
      },
      {
        question: "What new military technology made its battlefield debut at the Battle of Flers-Courcelette in 1916?",
        choices: [
          "Flamethrowers",
          "Tanks",
          "Fighter aircraft",
          "Barbed wire",
        ],
        answer: 1,
      },
      {
        question: "What was the Balfour Declaration of 1917?",
        choices: [
          "Britain's declaration of war on the Ottoman Empire",
          "A statement supporting a Jewish homeland in Palestine",
          "The U.S. announcement of neutrality",
          "Germany's unrestricted submarine warfare policy",
        ],
        answer: 1,
      },
      {
        question:
          "The Fourteen Points were proposed by which leader as a basis for peace?",
        choices: [
          "David Lloyd George",
          "Georges Clemenceau",
          "Woodrow Wilson",
          "Vittorio Orlando",
        ],
        answer: 2,
      },
      {
        question: "What was the 'war guilt clause' in the Treaty of Versailles?",
        choices: [
          "Article 231, placing blame for the war on Germany",
          "Article 10, creating the League of Nations",
          "Article 42, demilitarizing the Rhineland",
          "Article 119, stripping Germany of colonies",
        ],
        answer: 0,
      },
      {
        question: "Approximately how many soldiers died in World War I?",
        choices: [
          "About 2 million",
          "About 5 million",
          "About 9-10 million",
          "About 20 million",
        ],
        answer: 2,
      },
    ],
  },
];
