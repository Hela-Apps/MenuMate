using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IItemService
    {
        Task<Item> Add(Item item);
        Task<Item> Get(int id);
        Task<IEnumerable<Item>> GetAll();
        Task<int> GetLastId();
        void Delete(Item item);
    }
}
