ReactSwitch = React.createClass
  componentDidMount: () ->
    $(@getDOMNode()).wrap('<div class="switch" />').parent().bootstrapSwitch()
  render: ->
    R.input type:"checkbox", checked:true, "data-toggle":"switch"

module.exports = TableUI = React.createClass
  render: ->
    R.div className: "C21-Food Items", 
         for key, props of @props.listProps
       R.div className: key, 
           
                R.div null, key
             # R.th null, "on sale"
             # R.th null, "delete"
          R.tbody null,
            for id, product of @props.products
              R.tr key: id,
                for key, props of @props.listProps
                  R.td null, product[key] || ' '
                R.td null, ReactSwitch()
                R.td null, R.button onClick: @props.onDestroy.bind(@, id), className: "btn btn-warning", R.span className: "fui-cross"