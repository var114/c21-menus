# @porps.listProps

module.exports = EditorUI = React.createClass
  handleSubmit: (e) ->
    e.preventDefault(); #console.log('submitting')
    values = {}
    uniqueId = ""
    makeId = (text) ->
      text.toLowerCase()
    for key, props of @props.listProps
      values[key] = userInput = @refs[key].getDOMNode().value.trim()
      console.log(props.number)
      uniqueId = makeId(userInput) if props.idMaker   
    @props.firebaseRef.child(uniqueId).setWithPriority values, -Date.now(), (error) => @clearForm()
  clearForm: () ->
    for key, props of @props.listProps
      @refs[key].getDOMNode().value = ''

  render: ->
    R.form onSubmit: @handleSubmit,
      for key, props of @props.listProps
        $1 = R.label for: key, "#{key} "        
        $2 = R.input _.extend {ref: key, id: key, className: props.className}, props.attr
        $3 = R.button _.extend {ref: key, id: key, className: props.className}
        if props.form 
          [$1, $2]
        else 
          [$3]
             
      R.hr null
      R.button className: "btn btn-lg btn-block btn-primary", type: "submit", "Create",
        
