using CadastroCliente.Models;
using System.Collections.Generic;

namespace CadastroCliente.ViewModel
{
    public class ClienteListViewModel
    {
        public IEnumerable<Cliente> Cliente { get; set; }
    }
}