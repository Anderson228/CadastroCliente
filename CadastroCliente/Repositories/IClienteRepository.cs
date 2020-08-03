using CadastroCliente.Models;
using System.Collections.Generic;

namespace CadastroCliente.Repositories
{
    public interface IClienteRepository
    {
        IEnumerable<Cliente> Clientes { get; }
        Cliente GetClienteById(int ClienteId);
    }
}
