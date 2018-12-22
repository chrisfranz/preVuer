import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentText: '',
    nextId: 1,
    totalComponents: 0,
    components: [],
    focusComponent: {},
    newComponent: {
      id: null,
      title: null,
      parentId: null,
      childrenIds: [],
      rectangle: {
        x: 110,
        y: 120,
        height: 50,
        width: 50,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true,
        opacity: 0.3,
      },
    }
    
  },
  getters: {
    GET_COMPONENTS : state => {
      return state.components;
    },
    GET_CURRENT_TEXT : state => {
      return state.currentText;
    } 
  },
  mutations: {
    UPDATE_TEXT : (state, payload) => {
      state.currentText = payload
    },
    // ADD_COMPONENT : (state) => {
    //   state.components.push(state.currentText)
    //   state.currentText = '';
    // }
  
    ADD_COMPONENT : (state) => {
      const formattedTitle = state.currentText
        .replace(/[a-z]+/gi,
          word => word[0].toUpperCase() + word.slice(1))
        .replace(/[-_\s0-9\W]+/gi, '');

      const newComponent = {
        ...state.newComponent,
        title: formattedTitle,
        id: state.nextId.toString(),
      }
      state.components.push(newComponent)
      state.focusComponent = newComponent
      state.totalComponents + 1;
      state.nextId += 1;
    },
    DELETE_COMPONENT : (state, payload) => {
      let target;
      state.components.forEach((element, index) => {
        if (element.id === payload) {
          target = index;
        }
      })
      state.components.splice(target, 1)
      console.log(state.components)  
    },
    DRAW_BOX : (state) => {
      let rect2 = new Konva.Rect({
        x: 250,
        y: 100,
        width: 150,
        height: 90,
        fill: 'green',
        name: 'rect',
        draggable: true
      });
      layer.add(rect2);
      layer.draw();
    }
  },
  actions: {
    addComponent({commit}) {
      commit('ADD_COMPONENT')
    },
    updateText({commit}, payload) {
      commit('UPDATE_TEXT', payload)
    },
    drawBox({commit}) {
      commit('DRAW_BOX')
    },
    getCurrentText({commit}) {
      commit('GET_CURRENT_TEXT')
    },
    getComponents({commit}) {
      commit('GET_COMPONENTS');
    },
    deleteComponent({commit}, payload) {
      commit('DELETE_COMPONENT', payload)
    }
  }
})
