import * as $ from 'jquery';
// import json from './db/data.json'
// import xml from './db/data.xml'
// import csv from './db/data.csv'
import './typescript.ts'
import './babel.js'
import image from './images/webpack_logo.png'
import './styles/style.css'
import './styles/less.less'
import './styles/scss.scss'
import Post from '@models/post'

import React from 'react'
import {render} from 'react-dom'

let post = new Post('Статья', image, 'TheDiVaZo')
console.log(post.toString())

const App = () => (
    <div className="container">
    <h1>WebPack Курс</h1>
    <hr/>
    <div id="logo"></div>
    <hr/>
    <pre id="test"></pre>
    <hr/>
    <div className="box">
        <h2>Less Box</h2>
    </div>
    <hr/>
    <div className="block">
        <h2>SCSS block</h2>
    </div>
    </div>
)



render(<App />, document.getElementById('app'))

$('#test').html(post.toString())
// console.log('JSON: ',json)
// console.log('XML: ',xml)
// console.log('CSV: ',csv)


