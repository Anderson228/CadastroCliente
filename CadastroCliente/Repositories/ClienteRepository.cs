using CadastroCliente.Context;
using CadastroCliente.Models;
using System.Collections.Generic;
using System.Linq;

namespace CadastroCliente.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly EmpresaContext _context;

        public ClienteRepository(EmpresaContext contexto)
        {
            _context = contexto;
        }
        public IEnumerable<Cliente> Clientes => _context.Cliente;

        public Cliente GetClienteById(int ClienteId)
        {
            return _context.Cliente.FirstOrDefault(c => c.ClienteId == ClienteId);
            
        }


    }
}
