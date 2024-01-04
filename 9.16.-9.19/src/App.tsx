import './App.css'
import axios from 'axios'
import { DiaryEntry, Weather, Visibility, ValidationError } from './types'
import { useState, useEffect, SyntheticEvent } from 'react'
import { getAllEntries, createEntry } from './entryService'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    getAllEntries()
      .then(data => setEntries(data))
  }, [])

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);

    const date = formData.get('date') as string;
    const comment = formData.get('comment') as string;
    const weather = formData.get('weather') as Weather;
    const visibility = formData.get('visibility') as Visibility;

    const newEntry = {
      date,
      comment,
      weather,
      visibility,
    }

    createEntry(newEntry)
      .then(data => {
        setEntries(entries.concat(data))
        setError("")
      })
      .catch(err => {
        if (axios.isAxiosError<ValidationError>(err)) {
          console.error(err.response)
          if (typeof err.response?.data === 'string')
            setError(err.response?.data)
        } else {
          console.error(err)
        }
      })
  }

  return (<>
    <h1 className='title'>Ilari Airlines</h1>
    <h2 className='sub-title'>Add new entry</h2>
    {
      error && <span className='error'>{error}</span>
    }
    <form 
      onSubmit={(event) => handleSubmit(event)}
      className="new-entry-form"
    >
      <label htmlFor="date-input">Date: </label>
      <input type="date" id="date-input" name='date'/>

      <label htmlFor="comment-input">Comment: </label>
      <input type="text" id="comment-input" name='comment'/>

      <label htmlFor="weather-select">Weather: </label>
      <select name="weather" id="weather-select">
        {
          Object.values(Weather)
            .map(value => value.toString())
            .map(value => 
              <option
                key={value}
                id={value}
              >
                {value}
              </option>
            )
        }
      </select>

      <label htmlFor="visibility-select">Visibility: </label>
      <select name="visibility" id="visibility-select">
        {
          Object.values(Visibility)
            .map(value => value.toString())
            .map(value => 
              <option
                key={value}
                id={value}
              >
                {value}
              </option>
            )
        }
      </select>
      <button
        type='submit'
        className='submit-btn'
      >
        Submit
      </button>
    </form>
    <h2 className='sub-title'>Entries</h2>
    <ul>
      {
        entries?.map(entry => 
          <li key={entry.id} className='card'>
            <h3>{entry.date}</h3>
            <h3>{entry.visibility}</h3>
            <h3>{entry.weather}</h3>
          </li>
        )
      }
    </ul>
  </>)
}

export default App