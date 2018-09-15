

import {render} from 'inferno'
import {Message} from './message'

const root = document.getElementById('root')
render(<Message text='Hello.' />, root)

