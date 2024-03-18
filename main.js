const notesData = [
    {
      id: 'notes-jT-jjsyz61J8XKiI',
      title: 'Welcome to Notes, Dimas!',
      body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
      createdAt: '2022-07-28T10:03:12.594Z',
      archived: false,
    },
    {
      id: 'notes-aB-cdefg12345',
      title: 'Meeting Agenda',
      body: 'Discuss project updates and assign tasks for the upcoming week.',
      createdAt: '2022-08-05T15:30:00.000Z',
      archived: false,
    },
    {
      id: 'notes-XyZ-789012345',
      title: 'Shopping List',
      body: 'Milk, eggs, bread, fruits, and vegetables.',
      createdAt: '2022-08-10T08:45:23.120Z',
      archived: false,
    },
    {
      id: 'notes-1a-2b3c4d5e6f',
      title: 'Personal Goals',
      body: 'Read two books per month, exercise three times a week, learn a new language.',
      createdAt: '2022-08-15T18:12:55.789Z',
      archived: false,
    },
    {
      id: 'notes-LMN-456789',
      title: 'Recipe: Spaghetti Bolognese',
      body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
      createdAt: '2022-08-20T12:30:40.200Z',
      archived: false,
    },
    {
      id: 'notes-QwErTyUiOp',
      title: 'Workout Routine',
      body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
      createdAt: '2022-08-25T09:15:17.890Z',
      archived: false,
    },
    {
      id: 'notes-abcdef-987654',
      title: 'Book Recommendations',
      body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
      createdAt: '2022-09-01T14:20:05.321Z',
      archived: false,
    },
    {
      id: 'notes-zyxwv-54321',
      title: 'Daily Reflections',
      body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
      createdAt: '2022-09-07T20:40:30.150Z',
      archived: false,
    },
    {
      id: 'notes-poiuyt-987654',
      title: 'Travel Bucket List',
      body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
      createdAt: '2022-09-15T11:55:44.678Z',
      archived: false,
    },
    {
      id: 'notes-asdfgh-123456',
      title: 'Coding Projects',
      body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
      createdAt: '2022-09-20T17:10:12.987Z',
      archived: false,
    },
    {
      id: 'notes-5678-abcd-efgh',
      title: 'Project Deadline',
      body: 'Complete project tasks by the deadline on October 1st.',
      createdAt: '2022-09-28T14:00:00.000Z',
      archived: false,
    },
    {
      id: 'notes-9876-wxyz-1234',
      title: 'Health Checkup',
      body: 'Schedule a routine health checkup with the doctor.',
      createdAt: '2022-10-05T09:30:45.600Z',
      archived: false,
    },
    {
      id: 'notes-qwerty-8765-4321',
      title: 'Financial Goals',
      body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
      createdAt: '2022-10-12T12:15:30.890Z',
      archived: false,
    },
    {
      id: 'notes-98765-54321-12345',
      title: 'Holiday Plans',
      body: 'Research and plan for the upcoming holiday destination.',
      createdAt: '2022-10-20T16:45:00.000Z',
      archived: false,
    },
    {
      id: 'notes-1234-abcd-5678',
      title: 'Language Learning',
      body: 'Practice Spanish vocabulary for 30 minutes every day.',
      createdAt: '2022-10-28T08:00:20.120Z',
      archived: false,
    },
  ];

  function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notesData));
}

class NoteHeading extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <h1 class="text-2xl">Notes</h1>
            <button id="create-note">Create Note</button>
        `;

        document.getElementById('create-note').addEventListener('click', function() {
         
          document.getElementById('note-popup').style.display = 'grid';
      });
    }
}

class NoteContainer extends HTMLElement {
    constructor() {
        super();
        this._notes = [];
    }

    addNoteItem(item) {
        this._notes.push(item);
        this.render();
    }

    render() {
        this.innerHTML = '<div class="grid grid-cols-1 gap-4"></div>';
        
        this._notes.forEach(item => {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('id', item.id);
            noteItem.setAttribute('created-at', item.createdAt); 
            noteItem.setAttribute('title', item.title); 
            noteItem.setAttribute('desc', item.body); 
            this.appendChild(noteItem);
        });
    }
}

NoteContainer.prototype.updateNotesData = function(notes) {
  this._notes = notes;
  this.render();
};

class NoteItem extends HTMLElement {
  constructor() {
      super();
  }

  connectedCallback() {
      const id = this.getAttribute('id');
      const createdAt = new Date(this.getAttribute('created-at')); 
      const formattedDate = createdAt.toLocaleDateString();
      const formattedTime = createdAt.toLocaleTimeString();

      const title = this.getAttribute('title');
      const desc = this.getAttribute('desc');

      this.innerHTML = `
          <div class="bg-white p-4 rounded-md shadow-md border border-red-200 mx-10 my-4" id="${id}">
              <span class="text-sm text-gray-500">Created at: ${formattedDate} ${formattedTime}</span>
              <h2 class="text-lg font-semibold text-pink-700">${title}</h2>
              <p class="text-pink-500">${desc}</p>
              <button class="archive-button bg-pink-900 text-white px-4 py-2 rounded-md my-2">Archive</button>
          </div>
      `;

      this.querySelector('.archive-button').addEventListener('click', () => {
          this.archiveNote();
      });
  }

  archiveNote() {
      const id = this.getAttribute('id');
      const noteIndex = notesData.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
          notesData[noteIndex].archived = true;
          saveNotesToLocalStorage(); 
          this.remove();
      }
  }
}


customElements.define('note-container', NoteContainer);
customElements.define('note-item', NoteItem);
customElements.define('note-heading', NoteHeading);

const container = document.querySelector('note-container');
notesData.forEach(element => {
    container.addNoteItem(element);
});

document.getElementById('create-note-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const title = document.getElementById('note-title').value;
    const body = document.getElementById('note-body').value;

    const id = 'notes-' + Math.random().toString(36).substr(2, 9);

    const createdAt = new Date().toISOString();

    const newNote = {
        id: id,
        title: title,
        body: body,
        createdAt: createdAt,
        archived: false
    };

    notesData.push(newNote);

    saveNotesToLocalStorage(); 

    console.log(notesData);

    console.log('Updating notes data...');
    container.updateNotesData(notesData);
    console.log('Notes data updated.');

    console.log('Note created:', newNote);

    document.getElementById('note-popup').style.display = 'none';

    document.getElementById('create-note-form').reset();
});