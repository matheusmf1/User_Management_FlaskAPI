import React from 'react';

class App extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      users:[],
      id: '',
      nome:'',
      endereco:'',
      telefone:'',
      data: '',
      status:''
    }
  }

  idChange = event => {
    this.setState({
      id: event.target.value
    })
  }

  nomeChange = event => {
    this.setState({
      nome: event.target.value
    })
  }

  enderecoChange = ( event ) => {
    this.setState({
      endereco: event.target.value
    })
  }

  telefoneChange = event => {
    this.setState({
      telefone: event.target.value
    })
  }

  dataChange = event => {
    this.setState({
      data: event.target.value
    })
  }

  statusChange = event => {
    this.setState({
      status: event.target.value
    })
  }

  async submit( event,id ) {
    event.preventDefault()

      await fetch( 'http://localhost:5000/insert',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { 'nome': this.state.nome, 'endereco': this.state.endereco, 'telefone': this.state.telefone, 'data': this.state.data, 'status': this.state.status } )
       }
       
       ).then( ( response ) => { 
        if ( response.status === 200 )
          return response.json();
      }
      ).then( ( resp ) => {
       this.componentDidMount();
       window.location.reload()
       
      }).catch( ( error ) => console.log('error: ', error) ); 

  }

  async update( event,id ) {
    event.preventDefault()

    console.log('id', id)

    await fetch( `http://localhost:5000/update/${id}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { 'nome': this.state.nome, 'endereco': this.state.endereco, 'telefone': this.state.telefone, 'data': this.state.data, 'status': this.state.status } )
      }
      
      ).then( ( response ) => { 
      if ( response.status === 200 )
        return response.json();
    }
    ).then( ( resp ) => {
      this.componentDidMount();
      window.location.reload()
  
      
    }).catch( ( error ) => console.log('error: ', error) ); 

  }

  async componentDidMount() {
    await fetch( 'http://localhost:5000/get',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
     }
     
     ).then( ( response ) => { 
      if ( response.status === 200 )
        return response.json();
    }
    ).then( ( resp ) => {
      if ( resp.dados ) {
        this.setState({
          users: resp.dados,
          id: '',
          nome:'',
          endereco:'',
          telefosne:'',
          data: '',
          status:''
        })
      }
    }).catch( ( error ) => console.log('error: ', error) );
  }

  render() {  
    return (
      <div class='container'>

        <div class = 'row'>

          <div class = "col md-12">

            <div class = "jumbotron p-3">

              <h2>Gerenciar Empregados <button type="button"  class="btn btn-success float-right"
              data-toggle="modal" data-target="#mymodal">Adicionar novo Usuário</button> </h2>

              <input type="text" id="inputText"  onKeyUp={ () => { // Declare variables 
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("inputText");
                filter = input.value.toUpperCase();
                table = document.getElementById("table");
                tr = table.getElementsByTagName("tr");
              
                // Loop through all table rows, and hide those who don't match the search query
                for (i = 0; i < tr.length; i++) {
                  td = tr[i].getElementsByTagName("td")[1];
                  if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                      tr[i].style.display = "";
                    } else {
                      tr[i].style.display = "none";
                    }
                  } 
                }  } } placeholder="Search for names.."></input>
                
              <table id='table' class="table table-hover table-dark">

                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Endereco</th>
                  <th>Telefone</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

                { this.state.users.map( user =>

                [
            
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.endereco}</td>
                    <td>{user.telefone}</td>
                    <td>{user.data}</td>
                    <td>{user.status}</td>

                    <td>
                      <a href={`http://localhost:5000/update/${user.id}`} class="btn btn-warning btn-xs" data-toggle="modal" data-target={`#modaledit${user.id}`}>Editar</a>
                      <a href={`http://localhost:5000/delete/${user.id}`} class="btn btn-danger btn-xs" onclick="return confirm('Vocë tem certeza que deseja apagar ?')">Apagar</a>
                    </td>
                  </tr>,


                  //modal para editar user.
                  <div id={`modaledit${user.id}`} class="modal fade text-dark" role="dialog">
                  
                    <div class="modal-dialog">

                      <div class='modal-content'>

                        <div class="modal-header">
                          <h4 class="modal-title">Atualizar informações</h4>
                        </div>   

                        <div class="modal-body">

                          <form onSubmit={(e) => { this.update(e, user.id) }}>

                            <div class="form-group">

                              <label>Nome:</label>
                              <input type='hidden' name='id' value={`${user.id}`} onChange={ (e) => { this.idChange(e) } }></input>
                              <input type="text" class="form-control" name="nome" required placeholder={user.nome} onChange={ (e) => { this.nomeChange(e) } }></input>

                            </div>

                            <div class="form-group">

                              <label>Endereco:</label>
                              <input type="text" class="form-control" name="endereco" required placeholder={user.endereco} onChange={ (e) => { this.enderecoChange(e) } }></input>

                            </div>

                            <div class="form-group">

                              <label>Telefone:</label>
                              <input type="text" class="form-control" name="telefone" required placeholder={user.telefone} onChange={ (e) => { this.telefoneChange(e) } }></input>

                            </div>

                            <div class="form-group">

                              <label>Data:</label>
                              <input type="text" class="form-control" name="data" required placeholder={user.data} onChange={ (e) => { this.dataChange(e) } }></input>

                            </div>

                            <div class="form-group">

                              <label>Status:</label>
                              <input type="text" class="form-control" name="status" required placeholder={user.status} onChange={ (e) => { this.statusChange(e) } }></input>

                            </div>

                            <div class="form-group">

                              <button class="btn btn-primary" type="submit">Atualizar</button>

                            </div>

                          </form>

                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>

                      </div>

                    </div>

                  </div>

                ]

                  
                )}

              </table>

              {/* modal para Adicionar user */}
              <div id="mymodal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">

                    <div class="modal-header">
                      <h4 class="modal-title">Adicionar Pessoa</h4>
                    </div>   

                    <div class="modal-body">

                      <form onSubmit={(e) => { this.submit(e, this.state.id) }}>

                        <div class="form-group">

                          <label>Nome:</label>
                          <input type="text" class="form-control" name="nome" onChange={ (e) => { this.nomeChange(e) } }></input>

                        </div>

                        <div class="form-group">

                          <label>Endereco:</label>
                          <input type="text" class="form-control" name="endereco" onChange={ (e) => { this.enderecoChange(e) } }></input>

                        </div>

                        <div class="form-group">

                          <label>Telefone:</label>
                          <input type="text" class="form-control" name="telefone" onChange={ (e) => { this.telefoneChange(e) } }></input>

                        </div>

                        <div class="form-group">

                          <label>Data:</label>
                          <input type="text" class="form-control" name="data" onChange={ (e) => { this.dataChange(e) } }></input>

                        </div>

                        <div class="form-group">

                          <label>Status:</label>
                          <input type="text" class="form-control" name="status" onChange={ (e) => { this.statusChange(e) } }></input>

                        </div>

                        <div class="form-group">

                          <button class="btn btn-primary" type="submit">Adicionar</button>

                        </div>

                      </form>

                    </div>

                  <div class="modal-footer">
            
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>

                  </div>
            
                  </div>

                </div>
              </div>  

            </div>   


          </div>
        </div> 
      </div>

    );
      
  }
}

export default App;
