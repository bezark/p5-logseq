/**
 * User model
 */
function createModel () {
  return {
    openSketch () {
      // logseq.App.showMsg('hello, mind map')
      logseq.showMainUI()
    },
  }
}

function main () {
  logseq.provideStyle(`
    @import url("https://at.alicdn.com/t/font_2409735_lkeod9mm2ej.css");
  `)

  logseq.setMainUIInlineStyle({
    // position: 'fixed',
    // zIndex: 12,
  })

  logseq.App.registerUIItem('pagebar', {
    key: 'another-open-mind',
    template: `
     <a data-on-click="openSketch" title="open sketch">
       <i class="iconfont icon-icons-mind_map" style="font-size: 18px; line-height: 1em;"></i>
     </a>
    `,
  })

  // main ui
  // const root = document.querySelector('#app')
  const btnClose = document.createElement('button')
  const displaySketch = document.createElement('div')

  // events
  displaySketch.id = 'sketchey'


  // displaySketch.classList.add('mind-display', 'hidden')
  btnClose.textContent = 'CLOSE'
  btnClose.classList.add('close-btn')

  btnClose.addEventListener('click', () => {
    logseq.hideMainUI()
  }, false)

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      logseq.hideMainUI()
      p.noLoop()
    }
  }, false)

  logseq.on('ui:visible:changed', async ({ visible }) => {
    if (!visible) {
      displaySketch.classList.add('hidden')
      displaySketch.innerHTML = ''
      return
    }

    let currentPage = await logseq.Editor.getCurrentPage()
    
    let backlinkedBlocks = await logseq.DB.datascriptQuery(`[:find (pull ?b [*])
    :where
    [?b :block/path-refs [:block/name "`+currentPage.name+`"]]
    [?page :block/original-name ?name]]
`)
    // console.log(backlinkedBlocks)
    let textHonk = []
    for (const blocky of backlinkedBlocks) {
      textHonk.push(blocky[0].content)
     
    }
    // const blocks = await logseq.Editor.getCurrentPageBlocksTree()
    initSketch(displaySketch, btnClose, textHonk)
  })

  // mount to root
  // root.append(displaySketch)
}

/**
 * @param el
 * @param btnClose
 * @param data
 */
function initSketch (el, btnClose, data) {



  if(!p){p = new p5(sketch, 'sketchey');}
  p.updateWordsToDraw(data)
  p.loop()

  // let mind = new MindElixir(options)
  // mind.init()

  const patchRightBottomBar = () => {
    // const barWrap = document.querySelector('toolbar.rb')
    // barWrap.appendChild(btnClose)
  }

  setTimeout(() => {
    patchRightBottomBar()
    // mind.initSide()
    // el.classList.remove('hidden')
  }, 16)
}

// bootstrap
logseq.ready(createModel(), main).catch(console.error)
