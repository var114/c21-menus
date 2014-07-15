# Requires ReactFireMixin (global or AMD)
# ReactFireMixin = require('ReactFireMixin')
# @props =
#   listProps:
#   firebaseRef:

UI = require './MultiStructuralDocumentDatabaseAuthoringUI'

module.exports = React.createClass
  # Keep the list up-to-date with firebase
  # firebase object "id"s are JSON keys to the object 
  # intead of one of the object's keys 
  # Thus we use an Object to represent state
  mixins: [ReactFireMixin]
  componentWillMount: ->
    @bindAsObject(@props.firebaseRef, "products")
  # Delete a firebase document
  destroy: (id) ->
    console.log id
    @props.firebaseRef.child(id).remove()
  # update: (id, object) -> 
  # create: (object) ->
  #   Generate unique ID
  #   id = ...
  #   @update(id, object)
  getInitialState: ->
    { products: [] }
  render: ->
    R.div className: "products",
      UI.Form
        listProps: @props.listProps
        firebaseRef: @props.firebaseRef
      #UI.Table
       # products: @state.products
       # listProps: @props.listProps
        #onDestroy: @destroy
      UI.Menu
       products: @state.products
       listProps: @props.listProps
       onDestroy: @destroy