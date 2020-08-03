using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroCliente.Models
{
    public class Cliente
    {
        [Key]
        public int ClienteId { get; set; }

        [StringLength(100)]
        [Display(Name = "Digite seu  nome ou nome da empresa:")]
        [Required(ErrorMessage = "Esse campo é obrigatorio!")]
        public string Nome { get; set; }

        [StringLength(2)]
        [Required(ErrorMessage = "Digite PF para pessoa fisica ou Pj para juridica")]
        public string TipoCliente  { get; set; }

        [Display(Name = "Digite o Numero do documento")]
        [Required(ErrorMessage = "Esse campo é obrigatorio!")]
        public int Documento { get; set; }

        [Display(Name = "Digite a data do cadastro")]
        [Required(ErrorMessage = "Esse campo é obrigatorio")]
        public DateTime DataCadastro { get; set; }

        [Display(Name = "Telefone para contato")]
        [Required(ErrorMessage = "Esse campo é obrigatorio")]
        public int Telefone { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

    }
}