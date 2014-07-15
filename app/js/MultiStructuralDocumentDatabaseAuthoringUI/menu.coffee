
module.exports = MenuUI = React.createClass
  render: ->
   R.div className: "c21-food-container",
     R.div className: "c21-food-menu",
        for id, product of @props.products
          R.div className: "c21-food-item", key: id,
            for key, props of @props.listProps
              if props.number 
                  R.span null, product[key] || ' ' 
              else 
               R.div null, product[key] || ' '
            R.div null, R.button onClick: @props.onDestroy.bind(@, id), className: "btn btn-warning", R.div className: "fui-cross"
               #console.log(@props.listProps.price)
      #  for id, props of @props.listProps
       #   if id == props.price
           