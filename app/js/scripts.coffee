 # Remove 300ms touch delay
# attachFastClick = requir e('fastclick')
# attachFastClick(document.body)
# Js script


window.R = React.DOM
## giving react a structure to follow/render
foodListProps =
  title:
    className: "form-control"
    idMaker: true
    form: true
    attr:
      placeholder: "Unique name"
 # teaser:
  #  className: "form-control"
   # attr:
    #  placeholder: "Recommend this dish to someone."
  price:
    className: "form-control"
    form: true
    number: true
    attr:
      placeholder: "Name yo' price"
  ingredients:
    className: "tagsinput"
    form: true

  category:
    className: "btn btn-primary"
    
  
   
  
#https://luminous-fire-1310.firebaseio.com/products
ProductsURL = "https://glowing-fire-9751.firebaseio.com/products"
ProductsRef = new Firebase(ProductsURL)
# how to render product list. just as a list nothing else. 

ProductsApp = require('./FireList')

mountNode = document.getElementById('product-list')
component = ProductsApp { listProps: foodListProps, firebaseRef: ProductsRef }
React.renderComponent component, mountNode


