using Entity.Context;
using Entity.Enums;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Implementation
{
    public class OrderRepository : EfRepository<Order>, IOrderRepository
    {
        protected MenuDbContext _context;
        public OrderRepository(MenuDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Order> UpdateStatus(int id, OrderStatus status)
        {
            var order = await _context.Set<Order>().FirstOrDefaultAsync(x => x.Id == id);
            if (order != null)
            {
                order.Status = status;
            }
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<int> GetLastId()
        {
            return await _context.Set<Item>().CountAsync();
        }
    }
}
